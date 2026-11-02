import { RegistrationsTable } from "@/components/dashboard/registrations-table";
import { buttonVariants } from "@/components/ui/button";
import type { PaymentStatusFilter } from "@/core/application/ports/registration-repository";
import type { ListRegistrationsOutput } from "@/core/application/use-cases/list-registrations";
import { container, CURRENT_EVENT_SLUG } from "@/core/container";
import { formatDayMonth, formatMoney } from "@/lib/format";
import { cn } from "@/lib/utils";
import Link from "next/link";

const filters: { value: PaymentStatusFilter; label: string }[] = [
  { value: "all", label: "Todas" },
  { value: "paid", label: "Pagas" },
  { value: "pending", label: "Pendentes" },
  { value: "waitlist", label: "Fila de espera" },
];

function parseStatus(value: string | undefined): PaymentStatusFilter {
  return value === "paid" || value === "pending" || value === "waitlist" ? value : "all";
}

interface DashboardPageProps {
  searchParams: Promise<{ status?: string; q?: string; event?: string }>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const params = await searchParams;
  const status = parseStatus(params.status);
  const search = params.q?.trim() ?? "";

  // Cada edição tem suas próprias inscrições; por padrão mostra a edição atual.
  const events = await container.listEvents.execute();
  const event = events.find((e) => e.slug === params.event) ?? events.find((e) => e.slug === CURRENT_EVENT_SLUG)!;
  const isCurrent = event.slug === CURRENT_EVENT_SLUG;

  let data: ListRegistrationsOutput;
  try {
    data = await container.listRegistrations.execute({ eventSlug: event.slug, status, search });
  } catch (error) {
    console.error("[dashboard]", error);
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-red-800">
        <h1 className="text-lg font-bold">Não foi possível carregar as inscrições</h1>
        <p className="mt-2 text-sm">
          Verifique se o banco está acessível, se a variável <code>DATABASE_URL</code> está correta e se as tabelas foram
          criadas (<code>npm run db:migrate</code>).
        </p>
      </div>
    );
  }

  const { registrations, counts, capacity, revenue } = data;
  const isFull = counts.confirmed >= capacity;
  const stats = [
    {
      label: "Vagas ocupadas",
      value: `${counts.confirmed}/${capacity}`,
      hint: isFull ? "Esgotado" : `${capacity - counts.confirmed} restantes`,
      accent: isFull ? "text-magenta" : undefined,
    },
    { label: "Pagas", value: counts.paid, accent: "text-emerald-700" },
    { label: "Pendentes", value: counts.pending, accent: "text-amber-700" },
    { label: "Fila de espera", value: counts.waitlisted, accent: "text-ink" },
    { label: "Recebido", value: formatMoney(revenue), accent: "text-magenta" },
  ];

  const hrefFor = (next: PaymentStatusFilter) => {
    const query = new URLSearchParams();
    if (!isCurrent) query.set("event", event.slug);
    if (next !== "all") query.set("status", next);
    if (search) query.set("q", search);
    const qs = query.toString();
    return qs ? `/dashboard?${qs}` : "/dashboard";
  };

  return (
    <div className="space-y-8">
      {events.length > 1 && (
        <nav aria-label="Escolher evento" className="flex flex-wrap gap-2 border-b border-ink/10 pb-4">
          {events.map((e) => {
            const active = e.slug === event.slug;
            return (
              <Link
                key={e.slug}
                href={e.slug === CURRENT_EVENT_SLUG ? "/dashboard" : `/dashboard?event=${e.slug}`}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-2xl border px-4 py-2.5 text-left transition",
                  active ? "border-magenta bg-magenta text-white" : "border-ink/10 bg-white hover:border-magenta/40",
                )}
              >
                <span className="block text-sm font-semibold">{e.edition ?? e.name}</span>
                <span className={cn("block text-xs", active ? "text-white/75" : "text-muted")}>
                  {formatDayMonth(e.startsAt)}
                  {e.slug === CURRENT_EVENT_SLUG && " · atual"}
                </span>
              </Link>
            );
          })}
        </nav>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold tracking-[0.3em] text-magenta uppercase">{event.name}</p>
          <h1 className="mt-2 text-3xl font-semibold">Inscrições</h1>
        </div>
        <a
          href={`/dashboard/export?event=${event.slug}`}
          className={buttonVariants({ className: counts.paid === 0 ? "pointer-events-none opacity-50" : undefined })}
          aria-disabled={counts.paid === 0}
        >
          Exportar PDF das pagas ({counts.paid})
        </a>
      </div>

      <dl className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-3xl border border-ink/8 bg-white p-5 shadow-sm">
            <dt className="text-xs font-bold tracking-widest text-muted uppercase">{stat.label}</dt>
            <dd className={cn("mt-2 text-3xl font-semibold", stat.accent)}>{stat.value}</dd>
            {stat.hint && <dd className="mt-1 text-xs font-medium text-muted">{stat.hint}</dd>}
          </div>
        ))}
      </dl>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <nav aria-label="Filtrar por pagamento" className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Link
              key={filter.value}
              href={hrefFor(filter.value)}
              aria-current={status === filter.value ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                status === filter.value ? "bg-ink text-white" : "bg-white text-ink/70 hover:bg-blush",
              )}
            >
              {filter.label}
            </Link>
          ))}
        </nav>

        <form action="/dashboard" className="flex gap-2">
          {!isCurrent && <input type="hidden" name="event" value={event.slug} />}
          {status !== "all" && <input type="hidden" name="status" value={status} />}
          <input
            type="search"
            name="q"
            defaultValue={search}
            placeholder="Buscar nome, WhatsApp ou protocolo"
            className="h-10 w-full rounded-full border border-ink/12 bg-white px-4 text-sm focus:border-magenta focus:ring-4 focus:ring-magenta/15 focus:outline-none md:w-80"
          />
          <button type="submit" className="h-10 rounded-full bg-white px-4 text-sm font-semibold text-ink/80 hover:bg-blush">
            Buscar
          </button>
        </form>
      </div>

      <RegistrationsTable registrations={registrations} />
    </div>
  );
}
