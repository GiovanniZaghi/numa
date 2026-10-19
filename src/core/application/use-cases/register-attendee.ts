import { isRegistrationOpen } from "@/core/domain/entities/event";
import { createRegistration } from "@/core/domain/entities/registration";
import { EventNotFoundError, RegistrationClosedError } from "@/core/domain/errors";
import type { RegisterAttendeeDTO, RegisterAttendeeOutput } from "../dtos/register-attendee.dto";
import type { ConfirmationChannel } from "../ports/confirmation-channel";
import type { EventRepository } from "../ports/event-repository";
import type { RegistrationRepository } from "../ports/registration-repository";
import type { Clock, IdGenerator } from "../ports/runtime";

export class RegisterAttendeeUseCase {
  constructor(
    private readonly events: EventRepository,
    private readonly registrations: RegistrationRepository,
    private readonly confirmation: ConfirmationChannel,
    private readonly ids: IdGenerator,
    private readonly clock: Clock,
  ) {}

  async execute(input: RegisterAttendeeDTO): Promise<RegisterAttendeeOutput> {
    const event = await this.events.findBySlug(input.eventSlug);
    if (!event) throw new EventNotFoundError(input.eventSlug);

    const now = this.clock.now();
    if (!isRegistrationOpen(event, now)) throw new RegistrationClosedError();

    const draft = createRegistration(input, { id: this.ids.next(), now });
    const { registration, waitlistPosition } = await this.registrations.saveWithinCapacity(draft, event.capacity);

    return {
      registrationId: registration.id,
      confirmationUrl: this.confirmation.createConfirmationLink(registration, event),
      waitlisted: registration.waitlisted,
      waitlistPosition,
    };
  }
}
