import { InjectionToken } from '@angular/core';
import { Route } from '@angular/router';

import appleOrchards from '../../locale/buyer-pages/apple-orchards.json';
import bulkVermicompost from '../../locale/buyer-pages/bulk-vermicompost.json';
import dealerProgram from '../../locale/buyer-pages/dealer-program.json';
import nurseries from '../../locale/buyer-pages/nurseries.json';
import packagingSizes from '../../locale/buyer-pages/packaging-sizes.json';
import polyhouseFarmers from '../../locale/buyer-pages/polyhouse-farmers.json';
import qualityLabReports from '../../locale/buyer-pages/quality-lab-reports.json';
import { BuyerPageSlug, StatePageTranslations, StateRegionKey } from '../state-pages/state-page-content';
import { STATE_PAGE_CONFIG, StatePageConfig } from '../state-pages/state-page.registry';

export type BuyerPageConfig = StatePageConfig & {
  regionKey: BuyerPageSlug;
  b2bRegionKey: StateRegionKey;
};

export const BUYER_PAGE_REGISTRY: Record<BuyerPageSlug, BuyerPageConfig> = {
  'bulk-vermicompost': {
    regionKey: 'bulk-vermicompost',
    b2bRegionKey: 'pan-india-supply',
    path: '/bulk-vermicompost',
    translations: bulkVermicompost as StatePageTranslations,
  },
  'apple-orchards': {
    regionKey: 'apple-orchards',
    b2bRegionKey: 'himachal-pradesh',
    path: '/apple-orchards',
    translations: appleOrchards as StatePageTranslations,
  },
  'polyhouse-farmers': {
    regionKey: 'polyhouse-farmers',
    b2bRegionKey: 'punjab-haryana',
    path: '/polyhouse-farmers',
    translations: polyhouseFarmers as StatePageTranslations,
  },
  nurseries: {
    regionKey: 'nurseries',
    b2bRegionKey: 'uttar-pradesh',
    path: '/nurseries',
    translations: nurseries as StatePageTranslations,
  },
  'dealer-program': {
    regionKey: 'dealer-program',
    b2bRegionKey: 'pan-india-supply',
    path: '/dealer-program',
    translations: dealerProgram as StatePageTranslations,
  },
  'quality-lab-reports': {
    regionKey: 'quality-lab-reports',
    b2bRegionKey: 'pan-india-supply',
    path: '/quality-lab-reports',
    translations: qualityLabReports as StatePageTranslations,
  },
  'packaging-sizes': {
    regionKey: 'packaging-sizes',
    b2bRegionKey: 'pan-india-supply',
    path: '/packaging-sizes',
    translations: packagingSizes as StatePageTranslations,
  },
};

export function buyerPageRoute(slug: BuyerPageSlug): Route {
  return {
    path: slug,
    loadComponent: () =>
      import('../state-pages/state-page/state-page').then((m) => m.StatePageComponent),
    providers: [{ provide: STATE_PAGE_CONFIG, useValue: BUYER_PAGE_REGISTRY[slug] }],
  };
}
