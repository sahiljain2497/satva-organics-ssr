import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { SITE_URL } from '../../core/constants/seo.constants';
import { LocaleService } from '../../core/services/locale.service';
import { SeoService } from '../../core/services/seo.service';
import {
  blogPostingSchema,
  breadcrumbSchema,
  faqPageSchema,
} from '../../core/services/seo-schema';
import { BLOG_REGION_LABELS, BlogPost } from '../blog-post.model';
import { BlogsService } from '../blogs.service';

@Component({
  selector: 'app-blog-detail',
  imports: [RouterLink],
  templateUrl: './blog-detail.html',
  styleUrl: './blog-detail.css',
})
export class BlogDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);
  private readonly blogsService = inject(BlogsService);
  readonly locale = inject(LocaleService);
  readonly regionLabels = BLOG_REGION_LABELS;

  blog: BlogPost | undefined;

  regionLabel(code: keyof typeof BLOG_REGION_LABELS): string {
    const labels = BLOG_REGION_LABELS[code];
    return this.locale.isHindi ? labels.hi : labels.en;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (slug) {
        this.blog = this.blogsService.getBySlug(slug);
        if (this.blog) {
          const canonicalUrl = `${SITE_URL}/blogs/${this.blog.slug}`;
          const imageUrl = this.blog.imageUrl.startsWith('http')
            ? this.blog.imageUrl
            : `${SITE_URL}${this.blog.imageUrl}`;

          this.seo.setPageSeo({
            title: `${this.blog.title} | Satva Organics Blog`,
            description: this.blog.metaDescription,
            canonicalUrl,
            imageUrl,
          });
          const jsonLd: object[] = [
            blogPostingSchema(this.blog),
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Blog', path: '/blogs' },
              { name: this.blog.title, path: `/blogs/${this.blog.slug}` },
            ]),
          ];
          if (this.blog.faqs?.length) {
            jsonLd.push(faqPageSchema(this.blog.faqs));
          }
          this.seo.injectJsonLd(jsonLd);
        } else {
          this.router.navigate(['/blogs']);
        }
      }
    });
  }
}
