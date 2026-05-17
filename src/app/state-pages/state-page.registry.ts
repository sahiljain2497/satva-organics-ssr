import { InjectionToken } from '@angular/core';
import { Route } from '@angular/router';

import himachalPradesh from '../../locale/state-pages/himachal-pradesh.json';
import jammuKashmir from '../../locale/state-pages/jammu-kashmir.json';
import punjabHaryana from '../../locale/state-pages/punjab-haryana.json';
import uttarPradesh from '../../locale/state-pages/uttar-pradesh.json';
import { StatePageTranslations } from './state-page-content';

export type StatePageSlug =
  | 'himachal-pradesh'
  | 'jammu-kashmir'
  | 'uttar-pradesh'
  | 'punjab-haryana';

export interface StatePageConfig {
  regionKey: StatePageSlug;
  path: string;
  translations: StatePageTranslations;
}

export const STATE_PAGE_REGISTRY: Record<StatePageSlug, StatePageConfig> = {
  'himachal-pradesh': {
    regionKey: 'himachal-pradesh',
    path: '/himachal-pradesh',
    translations: himachalPradesh as StatePageTranslations,
  },
  'jammu-kashmir': {
    regionKey: 'jammu-kashmir',
    path: '/jammu-kashmir',
    translations: jammuKashmir as StatePageTranslations,
  },
  'uttar-pradesh': {
    regionKey: 'uttar-pradesh',
    path: '/uttar-pradesh',
    translations: uttarPradesh as StatePageTranslations,
  },
  'punjab-haryana': {
    regionKey: 'punjab-haryana',
    path: '/punjab-haryana',
    translations: punjabHaryana as StatePageTranslations,
  },
};

export const STATE_PAGE_CONFIG = new InjectionToken<StatePageConfig>('STATE_PAGE_CONFIG');

export function statePageRoute(slug: StatePageSlug): Route {
  return {
    path: slug,
    loadComponent: () =>
      import('./state-page/state-page').then((m) => m.StatePageComponent),
    providers: [{ provide: STATE_PAGE_CONFIG, useValue: STATE_PAGE_REGISTRY[slug] }],
  };
}
