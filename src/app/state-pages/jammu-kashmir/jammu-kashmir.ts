import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SITE_URL } from '../../core/constants/seo.constants';
import { WHATSAPP_BASE_URL } from '../../core/constants/whatsapp.constants';
import { LocaleService } from '../../core/services/locale.service';
import { SeoService } from '../../core/services/seo.service';
import { breadcrumbSchema, localBusinessSchema } from '../../core/services/seo-schema';

@Component({
  selector: 'app-jammu-kashmir',
  imports: [RouterLink],
  templateUrl: './jammu-kashmir.html',
  styleUrl: '../state-page.css',
})
export class JammuKashmir {
  private readonly seo = inject(SeoService);
  readonly locale = inject(LocaleService);
  protected readonly whatsappUrl = WHATSAPP_BASE_URL;

  constructor() {
    const canonicalUrl = `${SITE_URL}/jammu-kashmir`;
    this.seo.setPageSeo({
      title: 'J&K Vermicompost Supplier – Organic Fertilizer by Satva Organics',
      description:
        'Satva Organics provides 100% organic vermicompost to Jammu & Kashmir farmers (apples, saffron, vegetables). Enriched with beneficial microbes for J&K soil.',
      canonicalUrl,
    });
    this.seo.injectJsonLd([
      localBusinessSchema({
        description:
          'Organic vermicompost supplier for Jammu & Kashmir apple orchards, saffron, and vegetable farms.',
        areaServed: ['Jammu and Kashmir'],
      }),
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Jammu & Kashmir', path: '/jammu-kashmir' },
      ]),
    ]);
  }
}
