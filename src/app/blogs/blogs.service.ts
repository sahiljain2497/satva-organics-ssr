import { Injectable, LOCALE_ID, inject } from '@angular/core';

import { BLOGS_EN } from './blogs-en.data';
import { BLOGS_HI } from './blogs-hi.data';
import { BlogPost } from './blog-post.model';

@Injectable({ providedIn: 'root' })
export class BlogsService {
  private readonly localeId = inject(LOCALE_ID);

  getPosts(): BlogPost[] {
    const posts = this.localeId === 'hi' ? BLOGS_HI : BLOGS_EN;
    return [...posts].sort((a, b) => b.date.localeCompare(a.date));
  }

  getBySlug(slug: string): BlogPost | undefined {
    return this.getPosts().find((post) => post.slug === slug);
  }
}
