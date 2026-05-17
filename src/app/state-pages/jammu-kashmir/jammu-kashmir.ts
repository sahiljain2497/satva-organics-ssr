import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SITE_URL } from '../../core/constants/seo.constants';
import { LocaleService } from '../../core/services/locale.service';
import { SeoService } from '../../core/services/seo.service';
import { breadcrumbSchema, faqPageSchema, localBusinessSchema } from '../../core/services/seo-schema';
import { WhatsAppService } from '../../core/services/whatsapp.service';
import { StateProductQuote } from '../../shared/components/state-product-quote/state-product-quote';
import { StateQuickContact } from '../../shared/components/state-quick-contact/state-quick-contact';
import pageContent from '../../../locale/state-pages/jammu-kashmir.json';
import { getRegionB2bData, openRegionWhatsApp, scrollToSection } from '../state-page-b2b';
import { StatePageContent, StatePageTranslations } from '../state-page-content';

@Component({
  selector: 'app-jammu-kashmir',
  imports: [RouterLink, StateQuickContact, StateProductQuote],
  templateUrl: './jammu-kashmir.html',
  styleUrl: '../state-page.css',
})
export class JammuKashmir {
  private readonly seo = inject(SeoService);
  private readonly whatsApp = inject(WhatsAppService);
  readonly locale = inject(LocaleService);
  private readonly translations = pageContent as StatePageTranslations;
  protected readonly content: StatePageContent = this.locale.isHindi
    ? this.translations.hi
    : this.translations.en;

  protected readonly regionName = this.content.breadcrumbName;
  private readonly b2b = getRegionB2bData('jammu-kashmir', this.locale.isHindi);
  protected readonly productPacks = this.b2b.productPacks;
  protected readonly trustPoints = this.b2b.trustPoints;

  constructor() {
    const canonicalUrl = `${SITE_URL}/jammu-kashmir`;
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
        { name: this.content.breadcrumbName, path: '/jammu-kashmir' },
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
