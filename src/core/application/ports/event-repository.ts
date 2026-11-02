import type { Event } from "@/core/domain/entities/event";

export interface EventRepository {
  findBySlug(slug: string): Promise<Event | null>;
  /** Todas as edições, da mais recente para a mais antiga. */
  list(): Promise<Event[]>;
}
