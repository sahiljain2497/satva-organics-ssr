import { NgOptimizedImage } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { controlShowsError } from '../shared/utils/form-validation';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { SITE_URL } from '../core/constants/seo.constants';
import { LocaleService } from '../core/services/locale.service';
import { SeoService } from '../core/services/seo.service';
import { localBusinessSchema } from '../core/services/seo-schema';
import { WhatsAppService } from '../core/services/whatsapp.service';
import { ScrollRevealDirective } from '../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, ScrollRevealDirective, NgOptimizedImage],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly seo = inject(SeoService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly whatsApp = inject(WhatsAppService);
  readonly locale = inject(LocaleService);

  protected readonly isVideoMuted = signal(true);
  protected readonly partnerSubmitAttempted = signal(false);

  protected readonly partnerForm = this.formBuilder.nonNullable.group({
    userType: ['Farmer / Bulk', Validators.required],
    name: ['', Validators.required],
    phone: ['', Validators.required],
    location: [''],
    message: [''],
  });

  constructor() {
    this.seo.setPageSeo({
      title: 'Satva Organics - Premium Vermicompost for Orchards, Polyhouses & Dealers',
      description:
        'Satva Organics supplies premium vermicompost for apple orchards, polyhouse vegetables, nurseries, bulk buyers, and agri-input dealers. Request crop-wise guidance or a bulk quote.',
      canonicalUrl: SITE_URL,
    });
    this.seo.injectJsonLd(localBusinessSchema());
  }

  protected toggleVideoMute(): void {
    this.isVideoMuted.update((muted) => !muted);
  }

  protected partnerFieldError(field: 'name' | 'phone'): boolean {
    return controlShowsError(this.partnerForm, field, this.partnerSubmitAttempted());
  }

  protected onPartnerSubmit(): void {
    this.partnerSubmitAttempted.set(true);
    if (this.partnerForm.invalid) {
      this.partnerForm.markAllAsTouched();
      return;
    }

    const message = this.whatsApp.buildPartnerMessage({
      ...this.partnerForm.getRawValue(),
      source: 'Homepage partner form',
    });
    this.whatsApp.openChat(message);
  }
}
