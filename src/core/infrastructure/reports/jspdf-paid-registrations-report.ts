import type {
  PaidRegistrationsReport,
  PaidRegistrationsReportRenderer,
} from "@/core/application/ports/report-renderer";
import { registrationProtocol } from "@/core/domain/entities/registration";
import { formatPhone } from "@/core/domain/value-objects/phone";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";

const MAGENTA: [number, number, number] = [199, 21, 133];
const INK: [number, number, number] = [36, 17, 28];
const MUTED: [number, number, number] = [109, 86, 100];
const BLUSH: [number, number, number] = [252, 228, 236];

const TIME_ZONE = "America/Sao_Paulo";

const dateTime = (date: Date) =>
  new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short", timeZone: TIME_ZONE }).format(date).replace(", ", " ");
const longDate = (date: Date) =>
  new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric", timeZone: TIME_ZONE }).format(date);

export class JsPdfPaidRegistrationsReport implements PaidRegistrationsReportRenderer {
  readonly contentType = "application/pdf";
  readonly fileExtension = "pdf";

  async render({ event, registrations, generatedAt }: PaidRegistrationsReport): Promise<Uint8Array> {
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 14;

    // Cabeçalho
    doc.setFillColor(...MAGENTA);
    doc.rect(0, 0, pageWidth, 26, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(`${event.name} · Inscrições pagas`, margin, 13);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(
      `${longDate(event.startsAt)} · ${event.location.venueName}, ${event.location.city} - ${event.location.state}`,
      margin,
      20,
    );

    // Resumo
    doc.setTextColor(...INK);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(`${registrations.length} ${registrations.length === 1 ? "inscrição paga" : "inscrições pagas"}`, margin, 36);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...MUTED);
    doc.setFontSize(9);
    doc.text(`Gerado em ${dateTime(generatedAt)}`, pageWidth - margin, 36, { align: "right" });

    autoTable(doc, {
      startY: 41,
      margin: { left: margin, right: margin, bottom: 16 },
      head: [["#", "Nome completo", "WhatsApp", "Contato de emergência", "Protocolo", "Inscrição", "Pagamento"]],
      body: registrations.map((r, index) => [
        String(index + 1),
        r.fullName,
        formatPhone(r.whatsapp),
        r.emergencyContact,
        registrationProtocol(r),
        dateTime(r.createdAt),
        r.paidAt ? dateTime(r.paidAt) : "—",
      ]),
      styles: { font: "helvetica", fontSize: 9, cellPadding: 2.5, textColor: INK, lineColor: [235, 220, 228] },
      headStyles: { fillColor: INK, textColor: 255, fontStyle: "bold" },
      alternateRowStyles: { fillColor: BLUSH },
      columnStyles: {
        0: { cellWidth: 10, halign: "center", textColor: MUTED },
        1: { fontStyle: "bold" },
        2: { cellWidth: 32 },
        4: { cellWidth: 24, font: "courier" },
        5: { cellWidth: 34 },
        6: { cellWidth: 34 },
      },
      didDrawPage: () => {
        const page = doc.getCurrentPageInfo().pageNumber;
        doc.setFontSize(8);
        doc.setTextColor(...MUTED);
        doc.text(`${event.organizer} · ${event.name}`, margin, doc.internal.pageSize.getHeight() - 8);
        doc.text(`Página ${page}`, pageWidth - margin, doc.internal.pageSize.getHeight() - 8, { align: "right" });
      },
    });

    if (registrations.length === 0) {
      doc.setFontSize(11);
      doc.setTextColor(...MUTED);
      doc.text("Nenhuma inscrição marcada como paga até o momento.", margin, 60);
    }

    return new Uint8Array(doc.output("arraybuffer"));
  }
}
