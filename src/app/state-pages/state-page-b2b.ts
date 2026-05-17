import { WhatsAppService } from '../core/services/whatsapp.service';
import { STATE_B2B_CONFIG } from './state-page-b2b.config';
import { StateProductPack, StateRegionKey } from './state-page-content';

export function scrollToSection(fragment: string): void {
  document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function openRegionWhatsApp(
  whatsApp: WhatsAppService,
  regionName: string,
  isHindi: boolean,
): void {
  const text = whatsApp.buildStateProductQuoteMessage({
    region: regionName,
    product: isHindi ? 'सामान्य पूछताछ' : 'General enquiry',
  });
  whatsApp.openChat(text);
}

export function getRegionB2bData(
  regionKey: StateRegionKey,
  isHindi: boolean,
): { productPacks: StateProductPack[]; trustPoints: string[] } {
  const config = STATE_B2B_CONFIG[regionKey];
  const lang = isHindi ? 'hi' : 'en';

  const bulkDescription =
    config.bulkDescription?.[lang] ??
    (isHindi
      ? 'सहकारी, बड़े बागान, डिस्ट्रीब्यूटर — फ्रेट और थोक दर पूछताछ पर।'
      : 'Cooperatives, large farms, distributors — freight and wholesale on enquiry.');

  const productPacks: StateProductPack[] = isHindi
    ? [
        {
          id: '1kg',
          title: '1 किलो पैक',
          description: 'घर के बागान, ट्रायल या छोटी नर्सरी के लिए।',
          audience: 'घरेलू / ट्रायल',
          quoteLabel: '1 किलो की कीमत पूछें',
        },
        {
          id: '50kg',
          title: '50 किलो बैग',
          description: config.pack50kgDescription.hi,
          audience: 'किसान / बागान',
          quoteLabel: '50 किलो का कोट लें',
        },
        {
          id: 'bulk',
          title: 'थोक सप्लाई',
          description: bulkDescription,
          audience: 'थोक / FPO',
          quoteLabel: 'थोक दर पूछें',
        },
      ]
    : [
        {
          id: '1kg',
          title: '1 kg Pack',
          description: 'Home gardens, trials, or small nursery batches.',
          audience: 'Home / trial',
          quoteLabel: 'Get 1 kg price',
        },
        {
          id: '50kg',
          title: '50 kg Bag',
          description: config.pack50kgDescription.en,
          audience: 'Farmers / orchards',
          quoteLabel: 'Get 50 kg quote',
        },
        {
          id: 'bulk',
          title: 'Bulk Supply',
          description: bulkDescription,
          audience: 'Bulk / FPO',
          quoteLabel: 'Request bulk rate',
        },
      ];

  return {
    productPacks,
    trustPoints: config.trustPoints[lang],
  };
}
