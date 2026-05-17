import { LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { routes } from '../../app.routes';
import { LocaleService } from './locale.service';

describe('LocaleService', () => {
  let service: LocaleService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
        { provide: LOCALE_ID, useValue: 'en-US' },
      ],
    });

    service = TestBed.inject(LocaleService);
    await TestBed.inject(Router).navigateByUrl('/contact');
  });

  it('detects English locale from LOCALE_ID', () => {
    expect(service.isHindi).toBe(false);
  });

  it('builds English paths without locale prefix', () => {
    expect(service.localPath('/contact')).toBe('/contact');
    expect(service.localPath('/#benefits')).toBe('/#benefits');
  });

  it('builds alternate URLs for hreflang', () => {
    expect(service.buildAlternateUrls('https://satvaorganic.org')).toEqual({
      en: 'https://satvaorganic.org/contact',
      hi: 'https://satvaorganic.org/hi/contact',
    });
  });

  it('returns html lang for English', () => {
    expect(service.getHtmlLang()).toBe('en');
  });
});

describe('LocaleService (Hindi)', () => {
  let service: LocaleService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
        { provide: LOCALE_ID, useValue: 'hi' },
      ],
    });

    service = TestBed.inject(LocaleService);
    await TestBed.inject(Router).navigateByUrl('/contact');
  });

  it('detects Hindi locale from LOCALE_ID', () => {
    expect(service.isHindi).toBe(true);
  });

  it('builds Hindi-prefixed paths', () => {
    expect(service.localPath('/contact')).toBe('/hi/contact');
    expect(service.localPath('/')).toBe('/hi/');
  });

  it('returns html lang for Hindi', () => {
    expect(service.getHtmlLang()).toBe('hi');
  });
});
