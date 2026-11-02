import { container, CURRENT_EVENT_SLUG } from "@/core/container";
import { EventNotFoundError } from "@/core/domain/errors";
import { isAdmin } from "@/lib/session";
import type { NextRequest } from "next/server";

/** Baixa o PDF com todas as inscrições pagas do evento (?event=slug; padrão: edição atual). */
export async function GET(request: NextRequest) {
  if (!(await isAdmin())) {
    return new Response("Não autorizado", { status: 401 });
  }

  const eventSlug = request.nextUrl.searchParams.get("event") || CURRENT_EVENT_SLUG;

  try {
    const report = await container.exportPaidRegistrations.execute(eventSlug);
    return new Response(new Blob([report.bytes as Uint8Array<ArrayBuffer>], { type: report.contentType }), {
      headers: {
        "Content-Type": report.contentType,
        "Content-Disposition": `attachment; filename="${report.filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    if (error instanceof EventNotFoundError) return new Response("Evento não encontrado", { status: 404 });
    throw error;
  }
}
