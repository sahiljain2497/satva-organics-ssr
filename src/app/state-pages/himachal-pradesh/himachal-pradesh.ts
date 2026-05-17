import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SITE_URL } from '../../core/constants/seo.constants';
import { SeoService } from '../../core/services/seo.service';
import { breadcrumbSchema, localBusinessSchema } from '../../core/services/seo-schema';
import { LocaleService } from '../../core/services/locale.service';
import { WHATSAPP_BASE_URL } from '../../core/constants/whatsapp.constants';

@Component({
  selector: 'app-himachal-pradesh',
  imports: [RouterLink],
  templateUrl: './himachal-pradesh.html',
  styleUrl: '../state-page.css',
})
export class HimachalPradesh {
  private readonly seo = inject(SeoService);
  readonly locale = inject(LocaleService);
  protected readonly whatsappUrl = WHATSAPP_BASE_URL;

  constructor() {
    const canonicalUrl = `${SITE_URL}/himachal-pradesh`;
    this.seo.setPageSeo({
      title: 'Vermicompost in Himachal Pradesh – Satva Organics (Apple Farms)',
      description:
        'Pure vermicompost for Himachal’s orchards and farms. Satva’s bioactive organic fertilizer improves HP apple yields and soil health. Delivering quality organic manure in Himachal.',
      canonicalUrl,
    });
    this.seo.injectJsonLd([
      localBusinessSchema({
        description:
          'Organic vermicompost supplier for Himachal Pradesh apple orchards, vegetables, and high-value crops.',
        areaServed: ['Himachal Pradesh'],
      }),
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Himachal Pradesh', path: '/himachal-pradesh' },
      ]),
    ]);
  }
}
