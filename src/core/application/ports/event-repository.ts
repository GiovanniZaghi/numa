import type { Event } from "@/core/domain/entities/event";

export interface EventRepository {
  findBySlug(slug: string): Promise<Event | null>;
}
