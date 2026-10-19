import type { ConfirmationChannel } from "@/core/application/ports/confirmation-channel";
import type { Event } from "@/core/domain/entities/event";
import { registrationProtocol, type Registration } from "@/core/domain/entities/registration";
import { formatPhone } from "@/core/domain/value-objects/phone";

export class WhatsAppConfirmationChannel implements ConfirmationChannel {
  constructor(private readonly businessNumber: string | null) {}

  createConfirmationLink(registration: Registration, event: Event): string {
    const details = [
      `*Nome:* ${registration.fullName}`,
      `*WhatsApp:* ${formatPhone(registration.whatsapp)}`,
      `*Contato de emergência:* ${registration.emergencyContact}`,
    ];

    const message = (
      registration.waitlisted
        ? [
            `Olá! Entrei na *fila de espera* da *${event.name}* 💗`,
            "",
            ...details,
            "",
            `Protocolo: ${registrationProtocol(registration)}`,
            "Se abrir uma vaga, me avisem por aqui!",
          ]
        : [
            `Olá! Quero confirmar minha inscrição na *${event.name}* 💗`,
            "",
            ...details,
            "",
            "✅ Autorizo o uso de imagem",
            `✅ Ciente das condições de cancelamento (${event.cancellationWindowHours}h)`,
            "",
            `Protocolo: ${registrationProtocol(registration)}`,
            "Segue o comprovante do Pix:",
          ]
    ).join("\n");

    const base = this.businessNumber
      ? `https://wa.me/${this.businessNumber}`
      : "https://wa.me/";
    return `${base}?text=${encodeURIComponent(message)}`;
  }
}
