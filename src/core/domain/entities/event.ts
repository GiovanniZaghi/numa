import type { Money } from "../value-objects/money";
import type { Phone } from "../value-objects/phone";

export interface ScheduleItem {
  readonly time: string;
  readonly title: string;
  readonly description?: string;
  readonly tag?: string;
}

export interface Partner {
  readonly name: string;
  readonly category: string;
  /** Usuário do Instagram, sem "@". */
  readonly instagram?: string;
  /** Caminho do logo (foto de perfil). Sem logo, a UI mostra as iniciais. */
  readonly logoUrl?: string;
}

export interface Pillar {
  readonly title: string;
  readonly description: string;
}

export interface DressCodeRule {
  readonly audience: string;
  readonly title: string;
  readonly description: string;
  readonly palette: readonly { name: string; hex: string }[];
}

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

export interface EventLocation {
  readonly venueName: string;
  readonly street: string;
  readonly neighborhood: string;
  readonly city: string;
  readonly state: string;
  readonly postalCode: string;
  readonly region: string;
}

export interface PaymentInfo {
  readonly method: "pix";
  readonly key: string | null;
}

export interface EventContact {
  /** WhatsApp oficial que recebe os comprovantes. */
  readonly whatsapp: Phone | null;
}

export interface Event {
  readonly slug: string;
  readonly name: string;
  readonly organizer: string;
  readonly tagline: string;
  readonly startsAt: Date;
  readonly endsAt: Date;
  readonly location: EventLocation;
  readonly price: Money;
  /** Total de vagas; depois disso as inscrições vão para a fila de espera. */
  readonly capacity: number;
  readonly payment: PaymentInfo;
  readonly contact: EventContact;
  readonly cancellationWindowHours: number;
  readonly manifesto: string;
  readonly pillars: readonly Pillar[];
  readonly schedule: readonly ScheduleItem[];
  readonly inclusions: readonly string[];
  readonly partners: readonly Partner[];
  readonly dressCode: readonly DressCodeRule[];
  readonly faq: readonly FaqItem[];
}

export function fullAddress({ street, neighborhood, city, state, postalCode }: EventLocation): string {
  return `${street} - ${neighborhood}, ${city} - ${state}, ${postalCode}`;
}

export function isRegistrationOpen(event: Event, now: Date = new Date()): boolean {
  return now < event.startsAt;
}
