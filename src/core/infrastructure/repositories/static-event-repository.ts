import type { EventRepository } from "@/core/application/ports/event-repository";
import type { Event } from "@/core/domain/entities/event";
import { createPhone } from "@/core/domain/value-objects/phone";
import { numaExperiencia } from "../data/numa-experiencia";
import { numaHyrox } from "../data/numa-hyrox";

interface StaticEventRepositoryConfig {
  pixKey: string | null;
  /** DDI + DDD + número, só dígitos (ex.: 5511999999999). */
  whatsappNumber: string | null;
}

/** Todas as edições ficam aqui: as antigas continuam disponíveis para o painel e os relatórios. */
const editions = [numaHyrox, numaExperiencia];

export class StaticEventRepository implements EventRepository {
  private readonly events: ReadonlyMap<string, Event>;

  constructor({ pixKey, whatsappNumber }: StaticEventRepositoryConfig) {
    const payment = { method: "pix", key: pixKey } as const;
    const contact = { whatsapp: whatsappNumber ? createPhone(whatsappNumber, "WHATSAPP_NUMBER") : null };
    this.events = new Map(editions.map((data) => [data.slug, { ...data, payment, contact }]));
  }

  async findBySlug(slug: string): Promise<Event | null> {
    return this.events.get(slug) ?? null;
  }

  async list(): Promise<Event[]> {
    return [...this.events.values()].sort((a, b) => b.startsAt.getTime() - a.startsAt.getTime());
  }
}
