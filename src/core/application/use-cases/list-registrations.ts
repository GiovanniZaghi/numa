import type { Registration } from "@/core/domain/entities/registration";
import type { Money } from "@/core/domain/value-objects/money";
import { money } from "@/core/domain/value-objects/money";
import type { EventRepository } from "../ports/event-repository";
import type {
  RegistrationCounts,
  RegistrationQuery,
  RegistrationRepository,
} from "../ports/registration-repository";
import { GetEventUseCase } from "./get-event";

export interface ListRegistrationsOutput {
  registrations: Registration[];
  counts: RegistrationCounts;
  capacity: number;
  /** Valor já recebido (inscrições pagas x preço do evento). */
  revenue: Money;
}

export class ListRegistrationsUseCase {
  private readonly getEvent: GetEventUseCase;

  constructor(
    events: EventRepository,
    private readonly registrations: RegistrationRepository,
  ) {
    this.getEvent = new GetEventUseCase(events);
  }

  async execute(query: RegistrationQuery): Promise<ListRegistrationsOutput> {
    const event = await this.getEvent.execute(query.eventSlug);
    const [registrations, counts] = await Promise.all([
      this.registrations.list(query),
      this.registrations.count(query.eventSlug),
    ]);

    return {
      registrations,
      counts,
      capacity: event.capacity,
      revenue: money(counts.paid * event.price.amountInCents, event.price.currency),
    };
  }
}
