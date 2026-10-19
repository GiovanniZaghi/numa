import type { EventRepository } from "../ports/event-repository";
import type { RegistrationRepository } from "../ports/registration-repository";
import type { PaidRegistrationsReportRenderer } from "../ports/report-renderer";
import type { Clock } from "../ports/runtime";
import { GetEventUseCase } from "./get-event";

export interface ExportedReport {
  filename: string;
  contentType: string;
  bytes: Uint8Array;
  count: number;
}

export class ExportPaidRegistrationsUseCase {
  private readonly getEvent: GetEventUseCase;

  constructor(
    events: EventRepository,
    private readonly registrations: RegistrationRepository,
    private readonly renderer: PaidRegistrationsReportRenderer,
    private readonly clock: Clock,
  ) {
    this.getEvent = new GetEventUseCase(events);
  }

  async execute(eventSlug: string): Promise<ExportedReport> {
    const event = await this.getEvent.execute(eventSlug);
    const paid = await this.registrations.list({ eventSlug, status: "paid" });
    // No relatório a lista segue ordem alfabética, mais prática para conferência na entrada.
    const registrations = [...paid].sort((a, b) => a.fullName.localeCompare(b.fullName, "pt-BR"));
    const generatedAt = this.clock.now();

    const bytes = await this.renderer.render({ event, registrations, generatedAt });
    // AAAA-MM-DD no fuso do evento (toISOString usaria UTC e viraria o dia após 21h).
    const date = generatedAt.toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });

    return {
      filename: `${event.slug}-inscricoes-pagas-${date}.${this.renderer.fileExtension}`,
      contentType: this.renderer.contentType,
      bytes,
      count: registrations.length,
    };
  }
}
