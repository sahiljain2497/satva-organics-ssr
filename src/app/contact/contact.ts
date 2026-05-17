import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { WHATSAPP_BASE_URL } from '../core/constants/whatsapp.constants';
import { SITE_URL } from '../core/constants/seo.constants';
import { SeoService } from '../core/services/seo.service';
import { localBusinessSchema } from '../core/services/seo-schema';
import { WhatsAppService } from '../core/services/whatsapp.service';
import { ScrollRevealDirective } from '../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, ScrollRevealDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private readonly seo = inject(SeoService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly whatsApp = inject(WhatsAppService);

  protected readonly whatsappUrl = WHATSAPP_BASE_URL;

  protected readonly contactForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    requirement: ['Farmer/Bulk', Validators.required],
    message: [''],
  });

  constructor() {
    this.seo.setPageSeo({
      title: 'Contact Satva Organics – Vermicompost Supplier (Mohali, India)',
      description:
        'Reach Satva Organics for vermicompost sales, distribution, or partnership. Phone +91-93400-00099. Serving Himachal Pradesh, J&K, Uttar Pradesh, Punjab, and pan-India.',
      canonicalUrl: `${SITE_URL}/contact`,
    });
    this.seo.injectJsonLd(localBusinessSchema());
  }

  protected onContactSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const message = this.whatsApp.buildContactMessage(this.contactForm.getRawValue());
    this.whatsApp.openChat(message);
  }
}
