import { Injectable } from '@angular/core';

import { WHATSAPP_NUMBER } from '../constants/whatsapp.constants';

export interface PartnerInquiry {
  userType: string;
  name: string;
  message: string;
}

export interface ContactInquiry {
  name: string;
  phone: string;
  requirement: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class WhatsAppService {
  readonly number = WHATSAPP_NUMBER;
  readonly baseUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  openChat(message: string): void {
    const url = `${this.baseUrl}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  buildPartnerMessage({ userType, name, message }: PartnerInquiry): string {
    return $localize`:@@whatsapp.partner:Hi Satva, I am a ${userType}. My name is ${name}. Message: ${message}`;
  }

  buildContactMessage({ name, phone, requirement, message }: ContactInquiry): string {
    return $localize`:@@whatsapp.contact:Hi Satva, Name: ${name}, Phone: ${phone}, Req: ${requirement}, Msg: ${message}`;
  }
}
