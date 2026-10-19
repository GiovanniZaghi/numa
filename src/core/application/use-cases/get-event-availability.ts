import type { RegistrationRepository } from "../ports/registration-repository";
import type { EventRepository } from "../ports/event-repository";
import { GetEventUseCase } from "./get-event";

export interface EventAvailability {
  capacity: number;
  /** Inscrições que ocupam vaga. */
  taken: number;
  remaining: number;
  isFull: boolean;
}

export class GetEventAvailabilityUseCase {
  private readonly getEvent: GetEventUseCase;

  constructor(
    events: EventRepository,
    private readonly registrations: RegistrationRepository,
  ) {
    this.getEvent = new GetEventUseCase(events);
  }

  async execute(eventSlug: string): Promise<EventAvailability> {
    const event = await this.getEvent.execute(eventSlug);
    const { confirmed } = await this.registrations.count(eventSlug);
    const remaining = Math.max(0, event.capacity - confirmed);
    return { capacity: event.capacity, taken: confirmed, remaining, isFull: remaining === 0 };
  }
}
