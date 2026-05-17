import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SITE_URL } from '../core/constants/seo.constants';
import { LocaleService } from '../core/services/locale.service';
import { SeoService } from '../core/services/seo.service';
import { breadcrumbSchema, faqPageSchema, localBusinessSchema } from '../core/services/seo-schema';
import { WhatsAppService } from '../core/services/whatsapp.service';
import { StateProductQuote } from '../shared/components/state-product-quote/state-product-quote';
import { StateQuickContact } from '../shared/components/state-quick-contact/state-quick-contact';
import pageContent from '../../locale/state-pages/pan-india-supply.json';
import { getRegionB2bData, openRegionWhatsApp, scrollToSection } from '../state-pages/state-page-b2b';
import { StatePageContent, StatePageTranslations } from '../state-pages/state-page-content';

@Component({
  selector: 'app-pan-india-supply',
  imports: [RouterLink, StateQuickContact, StateProductQuote],
  templateUrl: './pan-india-supply.html',
  styleUrl: '../state-pages/state-page.css',
})
export class PanIndiaSupply {
  private readonly seo = inject(SeoService);
  private readonly whatsApp = inject(WhatsAppService);
  readonly locale = inject(LocaleService);
  private readonly translations = pageContent as StatePageTranslations;
  protected readonly content: StatePageContent = this.locale.isHindi
    ? this.translations.hi
    : this.translations.en;

  protected readonly regionName = this.content.breadcrumbName;
  private readonly b2b = getRegionB2bData('pan-india-supply', this.locale.isHindi);
  protected readonly productPacks = this.b2b.productPacks;
  protected readonly trustPoints = this.b2b.trustPoints;

  constructor() {
    const canonicalUrl = `${SITE_URL}/pan-india-supply`;
    this.seo.setPageSeo({
      title: this.content.seo.title,
      description: this.content.seo.description,
      canonicalUrl,
    });
    this.seo.injectJsonLd([
      localBusinessSchema({
        description: this.content.schemaDescription,
        areaServed: this.content.areaServed,
      }),
      breadcrumbSchema([
        { name: this.locale.isHindi ? 'होम' : 'Home', path: '/' },
        { name: this.content.breadcrumbName, path: '/pan-india-supply' },
      ]),
      faqPageSchema(this.content.faqs),
    ]);
  }

  protected scrollToSection(fragment: string): void {
    scrollToSection(fragment);
  }

  protected openRegionWhatsApp(): void {
    openRegionWhatsApp(this.whatsApp, this.regionName, this.locale.isHindi);
  }
}
