import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { WHATSAPP_BASE_URL } from '../../../core/constants/whatsapp.constants';
import { LocaleService } from '../../../core/services/locale.service';
import { WhatsAppService } from '../../../core/services/whatsapp.service';
import { controlShowsError } from '../../utils/form-validation';

@Component({
  selector: 'app-state-quick-contact',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './state-quick-contact.html',
  styleUrl: './state-quick-contact.css',
})
export class StateQuickContact {
  readonly regionName = input.required<string>();

  private readonly formBuilder = inject(FormBuilder);
  private readonly whatsApp = inject(WhatsAppService);
  readonly locale = inject(LocaleService);

  protected readonly whatsappUrl = WHATSAPP_BASE_URL;

  protected readonly submitAttempted = signal(false);

  protected readonly inquiryForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    message: [''],
  });

  protected fieldError(field: 'name' | 'phone'): boolean {
    return controlShowsError(this.inquiryForm, field, this.submitAttempted());
  }

  protected onSubmit(): void {
    this.submitAttempted.set(true);
    if (this.inquiryForm.invalid) {
      this.inquiryForm.markAllAsTouched();
      return;
    }

    const { name, phone, message } = this.inquiryForm.getRawValue();
    const text = this.whatsApp.buildStateContactMessage({
      region: this.regionName(),
      name,
      phone,
      message,
    });
    this.whatsApp.openChat(text);
  }
}
