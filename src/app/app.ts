import { Component, LOCALE_ID, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { WHATSAPP_BASE_URL } from './core/constants/whatsapp.constants';
import { LocaleService } from './core/services/locale.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly localeId = inject(LOCALE_ID);
  private readonly locale = inject(LocaleService);

  protected readonly whatsappUrl = WHATSAPP_BASE_URL;
  protected readonly isMobileNavOpen = signal(false);
  protected readonly langToggleLabel =
    this.localeId === 'hi' ? 'हिंदी | EN' : 'EN | हिंदी';

  protected localPath(path: string): string {
    return this.locale.localPath(path);
  }

  protected toggleMobileNav(): void {
    this.isMobileNavOpen.update((open) => !open);
  }

  protected closeMobileNav(): void {
    this.isMobileNavOpen.set(false);
  }

  protected toggleLanguage(): void {
    this.locale.switchLocale();
  }
}
