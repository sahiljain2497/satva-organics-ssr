import { RenderMode, ServerRoute } from '@angular/ssr';

import { BLOGS_EN } from './blogs/blogs-en.data';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'contact', renderMode: RenderMode.Prerender },
  { path: 'blogs', renderMode: RenderMode.Prerender },
  { path: 'himachal-pradesh', renderMode: RenderMode.Prerender },
  { path: 'jammu-kashmir', renderMode: RenderMode.Prerender },
  { path: 'uttar-pradesh', renderMode: RenderMode.Prerender },
  { path: 'punjab-haryana', renderMode: RenderMode.Prerender },
  { path: 'pan-india-supply', renderMode: RenderMode.Prerender },
  { path: 'bulk-vermicompost', renderMode: RenderMode.Prerender },
  { path: 'apple-orchards', renderMode: RenderMode.Prerender },
  { path: 'polyhouse-farmers', renderMode: RenderMode.Prerender },
  { path: 'nurseries', renderMode: RenderMode.Prerender },
  { path: 'dealer-program', renderMode: RenderMode.Prerender },
  { path: 'quality-lab-reports', renderMode: RenderMode.Prerender },
  { path: 'packaging-sizes', renderMode: RenderMode.Prerender },
  {
    path: 'blogs/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return BLOGS_EN.map((b) => ({ slug: b.slug }));
    },
  },
  { path: '**', renderMode: RenderMode.Server },
];
