import { isPlatformBrowser } from '@angular/common';
import { Injectable, LOCALE_ID, PLATFORM_ID, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LocaleService {
  private readonly localeId = inject(LOCALE_ID);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);

  get isHindi(): boolean {
    return this.localeId === 'hi';
  }

  /** Prefix a path for the current locale (used in app.html nav/footer links). */
  localPath(path: string): string {
    const normalized = path.startsWith('/') ? path : `/${path}`;

    if (this.isHindi) {
      return normalized === '/' ? '/hi/' : `/hi${normalized}`;
    }

    return normalized;
  }

  /** Build hreflang alternate URLs for the current route. */
  buildAlternateUrls(origin: string): { en: string; hi: string } {
    const route = this.router.url.split('?')[0] ?? '/';
    const base =
      route === '/' || route === '/hi' || route === '/hi/'
        ? '/'
        : route.replace(/^\/hi/, '') || '/';
    const suffix = base === '/' ? '/' : base;

    return {
      en: `${origin}${suffix}`,
      hi: `${origin}/hi${suffix === '/' ? '/' : suffix}`,
    };
  }

  switchLocale(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const route = this.router.url.split('?')[0] ?? '/';
    const base = route.replace(/^\/hi(?=\/|$)/, '') || '/';
    const target = this.isHindi
      ? base === '/'
        ? '/'
        : base
      : `/hi${base === '/' ? '/' : base}`;

    window.location.href = target;
  }

  getHtmlLang(): 'en' | 'hi' {
    return this.isHindi ? 'hi' : 'en';
  }
}
