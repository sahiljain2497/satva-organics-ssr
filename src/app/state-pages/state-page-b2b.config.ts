export interface StateB2bRegionCopy {
  pack50kgDescription: { en: string; hi: string };
  bulkDescription?: { en: string; hi: string };
  trustPoints: { en: string[]; hi: string[] };
}

export const STATE_B2B_CONFIG: Record<string, StateB2bRegionCopy> = {
  'himachal-pradesh': {
    pack50kgDescription: {
      en: 'Standard for apple orchards and farms — roughly 6–10 trees per bag.',
      hi: 'सेब बागान और खेतों के लिए मानक पैक — लगभग 6–10 पेड़ प्रति बैग।',
    },
    trustPoints: {
      en: [
        'Supplied from Mohali with orchard guidance for HP',
        '50 kg bags and bulk supply available',
        'We usually respond within 2 hours',
        'Freight and delivery discussed on enquiry',
      ],
      hi: [
        'मोहाली से सप्लाई — HP बागानों के लिए स्थानीय मार्गदर्शन',
        '50 किलो बैग और थोक उपलब्ध',
        'आमतौर पर 2 घंटे के भीतर जवाब',
        'फ्रेट / डिलीवरी पूछताछ पर चर्चा',
      ],
    },
  },
  'jammu-kashmir': {
    pack50kgDescription: {
      en: 'Standard for apple, saffron, and vegetable farms in the valley and Jammu plains.',
      hi: 'वादी और जम्मू मैदान में सेब, केसर और सब्जी खेतों के लिए मानक पैक।',
    },
    trustPoints: {
      en: [
        'Supply for Jammu & Kashmir growers from Mohali',
        '50 kg bags and bulk supply available',
        'We usually respond within 2 hours',
        'Freight to valley and Jammu discussed on enquiry',
      ],
      hi: [
        'मोहाली से जम्मू-कश्मीर किसानों के लिए सप्लाई',
        '50 किलो बैग और थोक उपलब्ध',
        'आमतौर पर 2 घंटे के भीतर जवाब',
        'वादी और जम्मू तक फ्रेट पूछताछ पर',
      ],
    },
  },
  'uttar-pradesh': {
    pack50kgDescription: {
      en: 'Standard for sugarcane, vegetables, wheat–rice, and horticulture across UP districts.',
      hi: 'यूपी में गन्ना, सब्जी, गेहूं–धान और बागवानी के लिए मानक पैक।',
    },
    trustPoints: {
      en: [
        'Supply for UP farmers and nurseries from Mohali',
        '50 kg bags and bulk supply available',
        'We usually respond within 2 hours',
        'District-wise freight discussed on enquiry',
      ],
      hi: [
        'मोहाली से यूपी किसानों और नर्सरी के लिए सप्लाई',
        '50 किलो बैग और थोक उपलब्ध',
        'आमतौर पर 2 घंटे के भीतर जवाब',
        'जिलेवार फ्रेट पूछताछ पर चर्चा',
      ],
    },
  },
  'punjab-haryana': {
    pack50kgDescription: {
      en: 'Standard for wheat–rice, vegetables, cotton, and polyhouse farms in Punjab & Haryana.',
      hi: 'पंजाब और हरियाणा में गेहूं–धान, सब्जी, कपास और पॉलीहाउस के लिए मानक पैक।',
    },
    trustPoints: {
      en: [
        'Local supplier from Mohali for Punjab & Haryana',
        '50 kg bags and bulk supply available',
        'We usually respond within 2 hours',
        'Quick delivery in tri-city and nearby districts',
      ],
      hi: [
        'मोहाली से पंजाब और हरियाणा के लिए स्थानीय सप्लायर',
        '50 किलो बैग और थोक उपलब्ध',
        'आमतौर पर 2 घंटे के भीतर जवाब',
        'ट्राई-सिटी और आसपास के जिलों में तेज़ डिलीवरी',
      ],
    },
  },
  'pan-india-supply': {
    pack50kgDescription: {
      en: 'Standard 50 kg bags for distributors, agri-stores, and institutional buyers.',
      hi: 'डिस्ट्रीब्यूटर, एग्री-स्टोर और संस्थागत खरीदारों के लिए 50 किलो बैग।',
    },
    bulkDescription: {
      en: 'FPOs, cooperatives, exporters — nationwide freight and wholesale rates on enquiry.',
      hi: 'FPO, सहकारी, निर्यातक — पूरे भारत में फ्रेट और थोक दर पूछताछ पर।',
    },
    trustPoints: {
      en: [
        'Pan-India bulk and wholesale vermicompost supply',
        'Custom branding and export packaging available',
        'We usually respond within 2 hours',
        'Freight and MOQ discussed on enquiry',
      ],
      hi: [
        'पूरे भारत में थोक वर्मीकम्पोस्ट सप्लाई',
        'कस्टम ब्रांडिंग और निर्यात पैकेजिंग उपलब्ध',
        'आमतौर पर 2 घंटे के भीतर जवाब',
        'फ्रेट और MOQ पूछताछ पर चर्चा',
      ],
    },
  },
};
