import { Injectable } from '@angular/core';

import { WHATSAPP_NUMBER } from '../constants/whatsapp.constants';

export interface PartnerInquiry {
  userType: string;
  name: string;
  phone?: string;
  location?: string;
  message: string;
  source?: string;
}

export interface ContactInquiry {
  name: string;
  phone: string;
  location?: string;
  requirement: string;
  message: string;
  source?: string;
}

export interface StateContactInquiry {
  region: string;
  name: string;
  phone: string;
  message: string;
}

export interface StateProductQuoteInquiry {
  region: string;
  product: string;
}

@Injectable({ providedIn: 'root' })
export class WhatsAppService {
  readonly number = WHATSAPP_NUMBER;
  readonly baseUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  openChat(message: string): void {
    const url = `${this.baseUrl}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  buildPartnerMessage({ userType, name, phone, location, message, source }: PartnerInquiry): string {
    const parts = [
      'Hi Satva,',
      source ? `Source: ${source}.` : '',
      `I am a ${userType}.`,
      `Name: ${name}.`,
      phone ? `Phone: ${phone}.` : '',
      location ? `Location: ${location}.` : '',
      message ? `Message: ${message}` : '',
    ].filter(Boolean);
    return parts.join(' ');
  }

  buildContactMessage({ name, phone, location, requirement, message, source }: ContactInquiry): string {
    const parts = [
      'Hi Satva,',
      source ? `Source: ${source}.` : '',
      `Name: ${name},`,
      `Phone: ${phone},`,
      location ? `Location: ${location},` : '',
      `Req: ${requirement},`,
      message ? `Msg: ${message}` : '',
    ].filter(Boolean);
    return parts.join(' ');
  }

  buildStateContactMessage({ region, name, phone, message }: StateContactInquiry): string {
    return $localize`:@@whatsapp.state:Hi Satva, enquiry for ${region}. Name: ${name}, Phone: ${phone}, Msg: ${message}`;
  }

  buildStateProductQuoteMessage({ region, product }: StateProductQuoteInquiry): string {
    return $localize`:@@whatsapp.stateProduct:Hi Satva, I need a quote for ${region}. Product: ${product}. Quantity and location: `;
  }
}
