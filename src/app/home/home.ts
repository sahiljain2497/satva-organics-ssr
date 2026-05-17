import { NgOptimizedImage } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
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

  protected readonly partnerForm = this.formBuilder.nonNullable.group({
    userType: ['Farmer', Validators.required],
    name: ['', Validators.required],
    message: [''],
  });

  constructor() {
    this.seo.setPageSeo({
      title: 'Satva Organics – Pure Vermicompost for HP, J&K, UP & All India',
      description:
        'Satva Organics’ scientifically-enriched vermicompost boosts yields in orchards and fields. Progressive farmers across Himachal, J&K, and UP trust our premium organic fertilizer with botanical extracts and beneficial microbes.',
      canonicalUrl: SITE_URL,
    });
    this.seo.injectJsonLd(localBusinessSchema());
  }

  protected toggleVideoMute(): void {
    this.isVideoMuted.update((muted) => !muted);
  }

  protected onPartnerSubmit(): void {
    if (this.partnerForm.invalid) {
      this.partnerForm.markAllAsTouched();
      return;
    }

    const message = this.whatsApp.buildPartnerMessage(this.partnerForm.getRawValue());
    this.whatsApp.openChat(message);
  }
}
