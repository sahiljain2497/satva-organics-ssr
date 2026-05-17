import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SITE_URL } from '../core/constants/seo.constants';
import { LocaleService } from '../core/services/locale.service';
import { SeoService } from '../core/services/seo.service';
import { breadcrumbSchema } from '../core/services/seo-schema';
import { BLOG_REGION_LABELS } from './blog-post.model';
import { BlogsService } from './blogs.service';

@Component({
  selector: 'app-blogs',
  imports: [RouterLink],
  templateUrl: './blogs.html',
  styleUrl: './blogs.css',
})
export class Blogs {
  private readonly seo = inject(SeoService);
  private readonly blogsService = inject(BlogsService);
  readonly locale = inject(LocaleService);

  readonly blogs = this.blogsService.getPosts();
  readonly regionLabels = BLOG_REGION_LABELS;

  constructor() {
    const isHi = this.locale.isHindi;
    this.seo.setPageSeo({
      title: isHi
        ? 'जैविक खेती ब्लॉग – सत्वा ऑर्गेनिक्स | वर्मीकंपोस्ट टिप्स'
        : 'Organic Farming Blog – Satva Organics | Vermicompost Tips',
      description: isHi
        ? 'हिमाचल, जम्मू-कश्मीर और उत्तर प्रदेश के किसानों के लिए वर्मीकंपोस्ट और जैविक खेती पर विशेषज्ञ सलाह, केस स्टडी और मिट्टी स्वास्थ्य गाइड।'
        : 'Expert advice on vermicompost and organic farming for Himachal Pradesh, Jammu & Kashmir, and Uttar Pradesh. Case studies, guides, and soil health insights from Satva Organics.',
      canonicalUrl: `${SITE_URL}/blogs`,
    });
    this.seo.injectJsonLd(
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blogs' },
      ]),
    );
  }
}
