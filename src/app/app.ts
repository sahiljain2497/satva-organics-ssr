import { NgOptimizedImage } from '@angular/common';
import { Component, LOCALE_ID, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { WHATSAPP_BASE_URL } from './core/constants/whatsapp.constants';
import { LocaleService } from './core/services/locale.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgOptimizedImage],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly localeId = inject(LOCALE_ID);
  private readonly locale = inject(LocaleService);

  protected readonly whatsappUrl = WHATSAPP_BASE_URL;
  protected readonly isMobileNavOpen = signal(false);
  protected readonly isAreasDropdownOpen = signal(false);
  protected readonly isBuyersDropdownOpen = signal(false);
  protected readonly langToggleLabel =
    this.localeId === 'hi' ? 'हिंदी | EN' : 'EN | हिंदी';

  protected localPath(path: string): string {
    return this.locale.localPath(path);
  }

  protected toggleMobileNav(): void {
    this.isMobileNavOpen.update((open) => {
      const next = !open;
      this.setBodyScrollLocked(next);
      return next;
    });
  }

  protected closeMobileNav(): void {
    this.isMobileNavOpen.set(false);
    this.isAreasDropdownOpen.set(false);
    this.isBuyersDropdownOpen.set(false);
    this.setBodyScrollLocked(false);
  }

  private setBodyScrollLocked(locked: boolean): void {
    if (typeof document === 'undefined') {
      return;
    }
    document.body.classList.toggle('nav-scroll-lock', locked);
  }

  protected toggleAreasDropdown(): void {
    this.isAreasDropdownOpen.update((open) => !open);
    if (!this.isAreasDropdownOpen()) {
      return;
    }
    this.isBuyersDropdownOpen.set(false);
  }

  protected toggleBuyersDropdown(): void {
    this.isBuyersDropdownOpen.update((open) => !open);
    if (!this.isBuyersDropdownOpen()) {
      return;
    }
    this.isAreasDropdownOpen.set(false);
  }

  protected toggleLanguage(): void {
    this.locale.switchLocale();
  }
}
