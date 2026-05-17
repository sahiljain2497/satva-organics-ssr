import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { DEFAULT_OG_IMAGE } from '../constants/seo.constants';
import { LocaleService } from './locale.service';

export interface PageSeo {
  title: string;
  description: string;
  canonicalUrl?: string;
  imageUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly locale = inject(LocaleService);

  private static readonly JSON_LD_ID_PREFIX = 'satva-jsonld';

  /** Runs during SSR and in the browser so crawlers receive full meta tags. */
  setPageSeo({ title, description, canonicalUrl, imageUrl }: PageSeo): void {
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: imageUrl ?? DEFAULT_OG_IMAGE });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: imageUrl ?? DEFAULT_OG_IMAGE });

    const origin =
      this.document.defaultView?.location.origin ?? 'https://satvaorganic.org';
    const { en, hi } = this.locale.buildAlternateUrls(origin);
    const pageUrl = this.locale.isHindi ? hi : en;

    this.meta.updateTag({ property: 'og:url', content: pageUrl });
    this.setCanonical(canonicalUrl ?? pageUrl);
    this.setHtmlLang(this.locale.getHtmlLang());
    this.setHreflangAlternates(en, hi);
  }

  /** Inject or replace JSON-LD structured data in document head (SSR-safe). */
  injectJsonLd(schema: object | object[]): void {
    this.removeJsonLd();
    const schemas = Array.isArray(schema) ? schema : [schema];
    schemas.forEach((entry, index) => {
      const script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.id =
        index === 0
          ? SeoService.JSON_LD_ID_PREFIX
          : `${SeoService.JSON_LD_ID_PREFIX}-${index}`;
      script.textContent = JSON.stringify(entry);
      this.document.head.appendChild(script);
    });
  }

  private removeJsonLd(): void {
    const prefix = SeoService.JSON_LD_ID_PREFIX;
    this.document
      .querySelectorAll(`script[id^="${prefix}"]`)
      .forEach((el) => el.remove());
  }

  private setCanonical(url: string): void {
    let link = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }

    link.href = url;
  }

  private setHtmlLang(lang: 'en' | 'hi'): void {
    this.document.documentElement.lang = lang;
  }

  private setHreflangAlternates(enUrl: string, hiUrl: string): void {
    this.upsertLink('alternate', 'en', enUrl);
    this.upsertLink('alternate', 'hi', hiUrl);
    this.upsertLink('alternate', 'x-default', enUrl);
  }

  private upsertLink(rel: string, hreflang: string, href: string): void {
    const selector = `link[rel="${rel}"][hreflang="${hreflang}"]`;
    let link = this.document.querySelector(selector) as HTMLLinkElement | null;

    if (!link) {
      link = this.document.createElement('link');
      link.rel = rel;
      link.hreflang = hreflang;
      this.document.head.appendChild(link);
    }

    link.href = href;
  }
}
