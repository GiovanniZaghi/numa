import { registrationProtocol, type Registration } from "@/core/domain/entities/registration";
import { formatPhone } from "@/core/domain/value-objects/phone";
import { formatDateTime } from "@/lib/format";
import { PaidToggle } from "./paid-toggle";

export function RegistrationsTable({ registrations }: { registrations: readonly Registration[] }) {
  if (registrations.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-ink/15 bg-white px-6 py-16 text-center text-muted">
        Nenhuma inscrição encontrada.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-3xl border border-ink/8 bg-white shadow-sm">
      <table className="w-full min-w-[820px] text-left text-sm">
        <thead className="border-b border-ink/8 bg-blush/50 text-xs tracking-widest text-ink/70 uppercase">
          <tr>
            <th className="px-5 py-4 font-bold">Participante</th>
            <th className="px-5 py-4 font-bold">WhatsApp</th>
            <th className="px-5 py-4 font-bold">Contato de emergência</th>
            <th className="px-5 py-4 font-bold">Inscrição</th>
            <th className="px-5 py-4 font-bold">Pagamento</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink/6">
          {registrations.map((r) => (
            <tr key={r.id} className="transition hover:bg-cream">
              <td className="px-5 py-4">
                <p className="flex flex-wrap items-center gap-2 font-bold text-ink">
                  {r.fullName}
                  {r.waitlisted && (
                    <span className="rounded-full bg-ink px-2 py-0.5 text-[10px] font-bold tracking-widest text-white uppercase">
                      Fila
                    </span>
                  )}
                </p>
                <p className="mt-0.5 font-mono text-xs text-muted">#{registrationProtocol(r)}</p>
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <a
                  href={`https://wa.me/55${r.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-magenta underline-offset-4 hover:underline"
                >
                  {formatPhone(r.whatsapp)}
                </a>
              </td>
              <td className="px-5 py-4 text-ink/80">{r.emergencyContact}</td>
              <td className="px-5 py-4 whitespace-nowrap text-muted">{formatDateTime(r.createdAt)}</td>
              <td className="px-5 py-4">
                <PaidToggle registrationId={r.id} name={r.fullName.split(" ")[0]} paid={r.paid} />
                {r.paidAt && <p className="mt-1.5 text-xs text-muted">em {formatDateTime(r.paidAt)}</p>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
