import { Component, inject, input } from '@angular/core';

import { LocaleService } from '../../../core/services/locale.service';
import { WhatsAppService } from '../../../core/services/whatsapp.service';
import { StateProductPack } from '../../../state-pages/state-page-content';
import { scrollToSection } from '../../../state-pages/state-page-b2b';

@Component({
  selector: 'app-state-product-quote',
  templateUrl: './state-product-quote.html',
  styleUrl: './state-product-quote.css',
})
export class StateProductQuote {
  readonly regionName = input.required<string>();
  readonly productPacks = input.required<StateProductPack[]>();
  readonly trustPoints = input.required<string[]>();

  private readonly whatsApp = inject(WhatsAppService);
  readonly locale = inject(LocaleService);

  protected requestProductQuote(pack: StateProductPack): void {
    const text = this.whatsApp.buildStateProductQuoteMessage({
      region: this.regionName(),
      product: pack.title,
    });
    this.whatsApp.openChat(text);
  }

  protected scrollToContact(): void {
    scrollToSection('state-contact');
  }
}
