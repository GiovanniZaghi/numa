import { container, CURRENT_EVENT_SLUG } from "@/core/container";
import { isAdmin } from "@/lib/session";

/** Baixa o PDF com todas as inscrições marcadas como pagas. */
export async function GET() {
  if (!(await isAdmin())) {
    return new Response("Não autorizado", { status: 401 });
  }

  const report = await container.exportPaidRegistrations.execute(CURRENT_EVENT_SLUG);

  return new Response(new Blob([report.bytes as Uint8Array<ArrayBuffer>], { type: report.contentType }), {
    headers: {
      "Content-Type": report.contentType,
      "Content-Disposition": `attachment; filename="${report.filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
