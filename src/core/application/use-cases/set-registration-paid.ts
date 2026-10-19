import { setPaid, type Registration } from "@/core/domain/entities/registration";
import { RegistrationNotFoundError } from "@/core/domain/errors";
import type { RegistrationRepository } from "../ports/registration-repository";
import type { Clock } from "../ports/runtime";

export interface SetRegistrationPaidInput {
  registrationId: string;
  paid: boolean;
}

export class SetRegistrationPaidUseCase {
  constructor(
    private readonly registrations: RegistrationRepository,
    private readonly clock: Clock,
  ) {}

  async execute({ registrationId, paid }: SetRegistrationPaidInput): Promise<Registration> {
    const registration = await this.registrations.findById(registrationId);
    if (!registration) throw new RegistrationNotFoundError(registrationId);

    const updated = setPaid(registration, paid, this.clock.now());
    if (updated !== registration) await this.registrations.update(updated);
    return updated;
  }
}
