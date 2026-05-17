import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SITE_URL } from '../../core/constants/seo.constants';
import { LocaleService } from '../../core/services/locale.service';
import { SeoService } from '../../core/services/seo.service';
import { breadcrumbSchema, faqPageSchema, localBusinessSchema } from '../../core/services/seo-schema';
import { WhatsAppService } from '../../core/services/whatsapp.service';
import { StateProductQuote } from '../../shared/components/state-product-quote/state-product-quote';
import { StateQuickContact } from '../../shared/components/state-quick-contact/state-quick-contact';
import { getRegionB2bData, openRegionWhatsApp, scrollToSection } from '../state-page-b2b';
import { StatePageContent } from '../state-page-content';
import { STATE_PAGE_CONFIG } from '../state-page.registry';

@Component({
  selector: 'app-state-page',
  imports: [RouterLink, StateQuickContact, StateProductQuote],
  templateUrl: './state-page.html',
  styleUrl: '../state-page.css',
})
export class StatePageComponent {
  private readonly config = inject(STATE_PAGE_CONFIG);
  private readonly seo = inject(SeoService);
  private readonly whatsApp = inject(WhatsAppService);
  readonly locale = inject(LocaleService);

  protected readonly content: StatePageContent = this.locale.isHindi
    ? this.config.translations.hi
    : this.config.translations.en;

  protected readonly regionName = this.content.breadcrumbName;
  private readonly b2b = getRegionB2bData(this.config.regionKey, this.locale.isHindi);
  protected readonly productPacks = this.b2b.productPacks;
  protected readonly trustPoints = this.b2b.trustPoints;

  constructor() {
    const canonicalUrl = `${SITE_URL}${this.config.path}`;
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
        { name: this.content.breadcrumbName, path: this.config.path },
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
