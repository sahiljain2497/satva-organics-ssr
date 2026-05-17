import { Injectable, LOCALE_ID, inject } from '@angular/core';

import { BLOGS_EN } from './blogs-en.data';
import { BLOGS_HI } from './blogs-hi.data';
import { BlogPost } from './blog-post.model';

@Injectable({ providedIn: 'root' })
export class BlogsService {
  private readonly localeId = inject(LOCALE_ID);

  getPosts(): BlogPost[] {
    return this.localeId === 'hi' ? BLOGS_HI : BLOGS_EN;
  }

  getBySlug(slug: string): BlogPost | undefined {
    return this.getPosts().find((post) => post.slug === slug);
  }
}
