import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { WHATSAPP_BASE_URL } from '../core/constants/whatsapp.constants';
import { SITE_URL } from '../core/constants/seo.constants';
import { LocaleService } from '../core/services/locale.service';
import { SeoService } from '../core/services/seo.service';
import { localBusinessSchema } from '../core/services/seo-schema';
import { WhatsAppService } from '../core/services/whatsapp.service';
import { ScrollRevealDirective } from '../shared/directives/scroll-reveal.directive';
import { controlShowsError } from '../shared/utils/form-validation';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, ScrollRevealDirective, RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private readonly seo = inject(SeoService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly whatsApp = inject(WhatsAppService);

  readonly locale = inject(LocaleService);
  protected readonly whatsappUrl = WHATSAPP_BASE_URL;

  protected readonly submitAttempted = signal(false);

  protected readonly contactForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    location: ['', Validators.required],
    requirement: ['Farmer/Bulk', Validators.required],
    message: [''],
  });

  protected fieldError(field: 'name' | 'phone' | 'location'): boolean {
    return controlShowsError(this.contactForm, field, this.submitAttempted());
  }

  constructor() {
    this.seo.setPageSeo({
      title: 'Contact Satva Organics - Bulk Vermicompost & Dealer Enquiries',
      description:
        'Contact Satva Organics for bulk vermicompost, crop-wise dosage guidance, 50 kg bags, nursery supply, and dealer or distributor enquiries. Call +91 93400 00099.',
      canonicalUrl: `${SITE_URL}/contact`,
    });
    this.seo.injectJsonLd(localBusinessSchema());
  }

  protected onContactSubmit(): void {
    this.submitAttempted.set(true);
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const message = this.whatsApp.buildContactMessage({
      ...this.contactForm.getRawValue(),
      source: 'Contact page',
    });
    this.whatsApp.openChat(message);
  }
}
