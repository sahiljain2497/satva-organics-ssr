import { RenderMode, ServerRoute } from '@angular/ssr';

import { BLOGS_EN } from './blogs/blogs-en.data';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'contact', renderMode: RenderMode.Prerender },
  { path: 'blogs', renderMode: RenderMode.Prerender },
  { path: 'himachal-pradesh', renderMode: RenderMode.Prerender },
  { path: 'jammu-kashmir', renderMode: RenderMode.Prerender },
  { path: 'uttar-pradesh', renderMode: RenderMode.Prerender },
  {
    path: 'blogs/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return BLOGS_EN.map((b) => ({ slug: b.slug }));
    },
  },
  { path: '**', renderMode: RenderMode.Server },
];
