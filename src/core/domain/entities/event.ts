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
  /** Endereço completo é opcional: sem rua, o site mostra só o nome do local (sem mapa). */
  readonly street?: string;
  readonly neighborhood?: string;
  readonly city?: string;
  readonly state?: string;
  readonly postalCode?: string;
  readonly region?: string;
}

/** Destaque do que acontece no evento (ex.: modalidade, atrações). */
export interface Highlight {
  readonly emoji: string;
  readonly title: string;
  readonly description: string;
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
  /** Nome da edição exibido junto ao logo (ex.: "Edição Hyrox"). */
  readonly edition?: string;
  readonly organizer: string;
  readonly tagline: string;
  readonly startsAt: Date;
  /** null quando o evento não tem horário de término definido. */
  readonly endsAt: Date | null;
  readonly location: EventLocation;
  readonly price: Money;
  /** Total de vagas; depois disso as inscrições vão para a fila de espera. */
  readonly capacity: number;
  /** Texto dos botões de inscrição (padrão: "Garantir minha vaga"). */
  readonly ctaLabel?: string;
  readonly payment: PaymentInfo;
  readonly contact: EventContact;
  readonly cancellationWindowHours: number;
  readonly manifesto: string;
  /** Recado específico da edição, exibido junto ao manifesto (ex.: "esta edição é mista"). */
  readonly manifestoNote?: string;
  readonly pillars: readonly Pillar[];
  readonly highlights: readonly Highlight[];
  readonly schedule: readonly ScheduleItem[];
  readonly inclusions: readonly string[];
  readonly partners: readonly Partner[];
  readonly dressCode: readonly DressCodeRule[];
  readonly faq: readonly FaqItem[];
}

/** Endereço completo para mapa/rotas, ou null se o evento ainda não tem rua definida. */
export function fullAddress({ street, neighborhood, city, state, postalCode }: EventLocation): string | null {
  if (!street) return null;
  const cityState = [city, state].filter(Boolean).join(" - ");
  return [street, [neighborhood, cityState].filter(Boolean).join(", "), postalCode].filter(Boolean).join(" - ");
}

/** "Casarão Méa · Suzano" ou só "Arena Polux". */
export function shortLocation({ venueName, city }: EventLocation): string {
  return [venueName, city].filter(Boolean).join(" · ");
}

export function isRegistrationOpen(event: Event, now: Date = new Date()): boolean {
  return now < event.startsAt;
}
