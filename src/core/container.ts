import "server-only";
import { DeleteRegistrationUseCase } from "./application/use-cases/delete-registration";
import { ExportPaidRegistrationsUseCase } from "./application/use-cases/export-paid-registrations";
import { GetEventUseCase } from "./application/use-cases/get-event";
import { GetEventAvailabilityUseCase } from "./application/use-cases/get-event-availability";
import { ListRegistrationsUseCase } from "./application/use-cases/list-registrations";
import { RegisterAttendeeUseCase } from "./application/use-cases/register-attendee";
import { SetRegistrationPaidUseCase } from "./application/use-cases/set-registration-paid";
import { WhatsAppConfirmationChannel } from "./infrastructure/channels/whatsapp-confirmation-channel";
import { env } from "./infrastructure/config/env";
import { getDb } from "./infrastructure/database/client";
import { JsPdfPaidRegistrationsReport } from "./infrastructure/reports/jspdf-paid-registrations-report";
import { PostgresRegistrationRepository } from "./infrastructure/repositories/postgres-registration-repository";
import { StaticEventRepository } from "./infrastructure/repositories/static-event-repository";

// Composition root: único lugar que conhece as implementações concretas.
const clock = { now: () => new Date() };
const ids = { next: () => crypto.randomUUID() };

const eventRepository = new StaticEventRepository({
  pixKey: env.PIX_KEY ?? null,
  whatsappNumber: env.WHATSAPP_NUMBER ?? null,
});
const registrationRepository = new PostgresRegistrationRepository(getDb);
const confirmationChannel = new WhatsAppConfirmationChannel(env.WHATSAPP_NUMBER ?? null);

export const container = {
  getEvent: new GetEventUseCase(eventRepository),
  registerAttendee: new RegisterAttendeeUseCase(
    eventRepository,
    registrationRepository,
    confirmationChannel,
    ids,
    clock,
  ),
  getEventAvailability: new GetEventAvailabilityUseCase(eventRepository, registrationRepository),
  listRegistrations: new ListRegistrationsUseCase(eventRepository, registrationRepository),
  setRegistrationPaid: new SetRegistrationPaidUseCase(registrationRepository, clock),
  deleteRegistration: new DeleteRegistrationUseCase(registrationRepository),
  exportPaidRegistrations: new ExportPaidRegistrationsUseCase(
    eventRepository,
    registrationRepository,
    new JsPdfPaidRegistrationsReport(),
    clock,
  ),
};

/** Evento atual da landing page e do painel. */
export const CURRENT_EVENT_SLUG = "numa-experiencia";
