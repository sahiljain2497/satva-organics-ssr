export interface StatePageTranslations {
  en: StatePageContent;
  hi: StatePageContent;
}

export interface StatePageContent {
  badge: string;
  heroTitle: string;
  heroLead: string;
  productCta: string;
  whatsappCta: string;
  sectionsBeforeTable: TextSection[];
  table: StatePageTable;
  supply?: TextSection;
  bestSuited?: ListSection;
  bestSuitedBeforeTable?: boolean;
  sectionsAfterTable?: ListSection[];
  faqTitle: string;
  faqs: FaqItem[];
  links: StatePageLink[];
  cta: StatePageCta;
  seo: StatePageSeo;
  schemaDescription: string;
  areaServed: string[];
  breadcrumbName: string;
}

export interface TextSection {
  title: string;
  paragraphs: string[];
  items?: ListItem[];
  note?: StatePageNote;
}

export interface ListSection {
  title: string;
  items: ListItem[];
}

export interface ListItem {
  label?: string;
  text: string;
}

export interface StatePageTable {
  title: string;
  intro?: string;
  headers: string[];
  rows: string[][];
  note?: StatePageNote;
}

export interface StatePageNote {
  label: string;
  text: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface StatePageLink {
  path: string;
  label: string;
}

export interface StatePageCta {
  title: string;
  description: string;
}

export interface StatePageSeo {
  title: string;
  description: string;
}

export interface StateProductPack {
  id: string;
  title: string;
  description: string;
  audience: string;
  quoteLabel: string;
}

export type StateRegionKey =
  | 'himachal-pradesh'
  | 'jammu-kashmir'
  | 'uttar-pradesh'
  | 'punjab-haryana'
  | 'pan-india-supply';

export type BuyerPageSlug =
  | 'bulk-vermicompost'
  | 'apple-orchards'
  | 'polyhouse-farmers'
  | 'nurseries'
  | 'dealer-program'
  | 'quality-lab-reports'
  | 'packaging-sizes';
