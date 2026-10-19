import type { EventRepository } from "@/core/application/ports/event-repository";
import type { Event } from "@/core/domain/entities/event";
import { createPhone } from "@/core/domain/value-objects/phone";
import { numaExperiencia } from "../data/numa-experiencia";

interface StaticEventRepositoryConfig {
  pixKey: string | null;
  /** DDI + DDD + número, só dígitos (ex.: 5511999999999). */
  whatsappNumber: string | null;
}

export class StaticEventRepository implements EventRepository {
  private readonly events: ReadonlyMap<string, Event>;

  constructor({ pixKey, whatsappNumber }: StaticEventRepositoryConfig) {
    const payment = { method: "pix", key: pixKey } as const;
    const contact = { whatsapp: whatsappNumber ? createPhone(whatsappNumber, "WHATSAPP_NUMBER") : null };
    this.events = new Map([[numaExperiencia.slug, { ...numaExperiencia, payment, contact }]]);
  }

  async findBySlug(slug: string): Promise<Event | null> {
    return this.events.get(slug) ?? null;
  }
}
