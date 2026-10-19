import { DomainError } from "../errors";
import { createPhone, type Phone } from "../value-objects/phone";

export interface Registration {
  readonly id: string;
  readonly eventSlug: string;
  readonly fullName: string;
  readonly whatsapp: Phone;
  readonly emergencyContact: string;
  readonly imageConsent: true;
  readonly cancellationPolicyAccepted: true;
  /** Feita depois de esgotar as vagas: não ocupa vaga, aguarda na fila de espera. */
  readonly waitlisted: boolean;
  /** Confirmado manualmente pela organização após conferir o comprovante. */
  readonly paid: boolean;
  readonly paidAt: Date | null;
  readonly createdAt: Date;
}

export interface CreateRegistrationProps {
  eventSlug: string;
  fullName: string;
  whatsapp: string;
  emergencyContact: string;
  imageConsent: boolean;
  cancellationPolicyAccepted: boolean;
}

export function createRegistration(
  props: CreateRegistrationProps,
  deps: { id: string; now: Date },
): Registration {
  const fullName = props.fullName.trim().replace(/\s+/g, " ");
  if (fullName.split(" ").length < 2) {
    throw new DomainError("Informe nome e sobrenome.", "fullName");
  }
  if (!props.imageConsent) {
    throw new DomainError("É necessário autorizar o uso de imagem.", "imageConsent");
  }
  if (!props.cancellationPolicyAccepted) {
    throw new DomainError(
      "É necessário aceitar as condições de cancelamento.",
      "cancellationPolicyAccepted",
    );
  }

  return {
    id: deps.id,
    eventSlug: props.eventSlug,
    fullName,
    whatsapp: createPhone(props.whatsapp, "whatsapp"),
    emergencyContact: props.emergencyContact.trim(),
    imageConsent: true,
    cancellationPolicyAccepted: true,
    waitlisted: false,
    paid: false,
    paidAt: null,
    createdAt: deps.now,
  };
}

/** Uma nova inscrição vai para a fila quando as vagas confirmadas já atingiram a capacidade. */
export function shouldWaitlist(confirmedCount: number, capacity: number): boolean {
  return confirmedCount >= capacity;
}

/** Marca ou desmarca o pagamento, registrando quando foi confirmado. */
export function setPaid(registration: Registration, paid: boolean, now: Date): Registration {
  if (registration.paid === paid) return registration;
  return { ...registration, paid, paidAt: paid ? now : null };
}

/** Código curto exibido para a participante e no painel. */
export function registrationProtocol(registration: Pick<Registration, "id">): string {
  return registration.id.slice(0, 8).toUpperCase();
}
