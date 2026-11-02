import type { Event } from "@/core/domain/entities/event";
import type { EventRepository } from "../ports/event-repository";

export class ListEventsUseCase {
  constructor(private readonly events: EventRepository) {}

  execute(): Promise<Event[]> {
    return this.events.list();
  }
}
