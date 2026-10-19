import type { Event } from "@/core/domain/entities/event";
import type { Registration } from "@/core/domain/entities/registration";

export interface PaidRegistrationsReport {
  event: Event;
  registrations: readonly Registration[];
  generatedAt: Date;
}

/** Gera o documento (ex.: PDF) com a lista de inscrições pagas. */
export interface PaidRegistrationsReportRenderer {
  readonly contentType: string;
  readonly fileExtension: string;
  render(report: PaidRegistrationsReport): Promise<Uint8Array>;
}
