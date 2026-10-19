import type { Event } from "@/core/domain/entities/event";
import type { Registration } from "@/core/domain/entities/registration";

/** Canal onde a participante conclui a inscrição (ex.: envio do comprovante). */
export interface ConfirmationChannel {
  createConfirmationLink(registration: Registration, event: Event): string;
}
