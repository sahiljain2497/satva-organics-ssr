import { ImageLoader, ImageLoaderConfig } from '@angular/common';

const DEFAULT_WIDTH: Record<string, number> = {
  logo_icon: 120,
  hero: 640,
  '1kg': 400,
  '50kg': 400,
};

/** Maps ngSrc base names + width descriptors to `name-{width}w.webp` in public/. */
export const satvaImageLoader: ImageLoader = (config: ImageLoaderConfig) => {
  const base = config.src.replace(/\.(webp|png)$/i, '');
  const width = config.width ?? DEFAULT_WIDTH[base] ?? 400;
  return `/${base}-${width}w.webp`;
};
