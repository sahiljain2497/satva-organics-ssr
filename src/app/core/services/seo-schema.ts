import { DEFAULT_OG_IMAGE, SITE_URL } from '../constants/seo.constants';

export function localBusinessSchema(
  overrides: {
    description?: string;
    areaServed?: string[];
  } = {},
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Satva Organics',
    url: SITE_URL,
    telephone: '+91-93400-00099',
    image: DEFAULT_OG_IMAGE,
    description:
      overrides.description ??
      'Premium vermicompost enriched with botanical extracts and beneficial microbes for sustainable farming across North India.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mohali',
      addressRegion: 'Punjab',
      addressCountry: 'IN',
    },
    areaServed: overrides.areaServed ?? [
      'Himachal Pradesh',
      'Jammu and Kashmir',
      'Uttar Pradesh',
      'Punjab',
      'Haryana',
    ],
  };
}

export function productSchemas(): object[] {
  const products = [
    {
      name: 'Satva Vermicompost 1kg Pack',
      description: 'Ideal for home pots and small plants.',
    },
    {
      name: 'Satva Vermicompost 50kg Bag',
      description: 'Standard size for orchards and field application.',
    },
    {
      name: 'Satva Vermicompost Bulk Supply',
      description: 'Bulk organic fertilizer for institutional and farm buyers.',
    },
  ];

  return products.map((p) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description,
    brand: { '@type': 'Brand', name: 'Satva Organics' },
    image: DEFAULT_OG_IMAGE,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/#products`,
    },
  }));
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqPageSchema(
  faqs: { question: string; answer: string }[],
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function blogPostingSchema(post: {
  title: string;
  metaDescription: string;
  author: string;
  date: string;
  slug: string;
  imageUrl: string;
  updatedDate?: string;
}): object {
  const image = post.imageUrl.startsWith('http')
    ? post.imageUrl
    : `${SITE_URL}${post.imageUrl}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    datePublished: post.date,
    ...(post.updatedDate ? { dateModified: post.updatedDate } : {}),
    image,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blogs/${post.slug}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Satva Organics',
      logo: {
        '@type': 'ImageObject',
        url: DEFAULT_OG_IMAGE,
      },
    },
  };
}
