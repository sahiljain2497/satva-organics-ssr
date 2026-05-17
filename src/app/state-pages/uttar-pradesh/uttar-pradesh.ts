import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SITE_URL } from '../../core/constants/seo.constants';
import { WHATSAPP_BASE_URL } from '../../core/constants/whatsapp.constants';
import { LocaleService } from '../../core/services/locale.service';
import { SeoService } from '../../core/services/seo.service';
import { breadcrumbSchema, localBusinessSchema } from '../../core/services/seo-schema';

@Component({
  selector: 'app-uttar-pradesh',
  imports: [RouterLink],
  templateUrl: './uttar-pradesh.html',
  styleUrl: '../state-page.css',
})
export class UttarPradesh {
  private readonly seo = inject(SeoService);
  readonly locale = inject(LocaleService);
  protected readonly whatsappUrl = WHATSAPP_BASE_URL;

  constructor() {
    const canonicalUrl = `${SITE_URL}/uttar-pradesh`;
    this.seo.setPageSeo({
      title: 'Buy Vermicompost in Uttar Pradesh – Bulk Organic Fertilizer',
      description:
        'Trusted vermicompost supplier in Uttar Pradesh. Satva’s premium organic fertilizer suits UP crops (vegetables, cereals). Order bulk or retail for healthy, high-yield farming.',
      canonicalUrl,
    });
    this.seo.injectJsonLd([
      localBusinessSchema({
        description:
          'Premium vermicompost supplier for Uttar Pradesh vegetable farms, cereals, and polyhouse crops.',
        areaServed: ['Uttar Pradesh'],
      }),
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Uttar Pradesh', path: '/uttar-pradesh' },
      ]),
    ]);
  }
}
