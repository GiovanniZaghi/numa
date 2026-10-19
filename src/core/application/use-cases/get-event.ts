import type { Event } from "@/core/domain/entities/event";
import { EventNotFoundError } from "@/core/domain/errors";
import type { EventRepository } from "../ports/event-repository";

export class GetEventUseCase {
  constructor(private readonly events: EventRepository) {}

  async execute(slug: string): Promise<Event> {
    const event = await this.events.findBySlug(slug);
    if (!event) throw new EventNotFoundError(slug);
    return event;
  }
}
