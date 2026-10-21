import type { Registration } from "@/core/domain/entities/registration";
import { RegistrationNotFoundError } from "@/core/domain/errors";
import type { RegistrationRepository } from "../ports/registration-repository";

/** Remove uma inscrição (ex.: duplicada). Se ela ocupava vaga, a vaga volta a ficar livre. */
export class DeleteRegistrationUseCase {
  constructor(private readonly registrations: RegistrationRepository) {}

  async execute(registrationId: string): Promise<Registration> {
    const registration = await this.registrations.findById(registrationId);
    if (!registration) throw new RegistrationNotFoundError(registrationId);

    await this.registrations.delete(registration.id);
    return registration;
  }
}
