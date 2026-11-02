import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { shortLocation, type Event } from "@/core/domain/entities/event";
import { formatDayMonth, formatMoney, formatTimeRange } from "@/lib/format";
import { Reveal } from "./reveal";

/** Detalhes da edição: modalidade, atrações e números (vagas, valor, data). */
export function HighlightsSection({ event }: { event: Event }) {
  if (event.highlights.length === 0) return null;

  const facts = [
    { label: "Vagas", value: `Apenas ${event.capacity}` },
    { label: "Valor", value: formatMoney(event.price) },
    { label: "Quando", value: `${formatDayMonth(event.startsAt)} · ${formatTimeRange(event.startsAt, event.endsAt)}` },
    { label: "Onde", value: shortLocation(event.location) },
  ];

  return (
    <section id="detalhes" className="bg-blush py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="O que vai rolar"
            title={
              <>
                Treino intenso, comunidade e <em className="font-normal text-magenta">muita adrenalina</em>
              </>
            }
          />
        </Reveal>

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {event.highlights.map((item, index) => (
            <Reveal as="li" key={item.title} delay={index * 100}>
              <article className="group flex h-full flex-col rounded-[2rem] bg-white p-8 shadow-sm shadow-magenta/5 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-magenta/10">
                <span
                  aria-hidden
                  className="grid size-16 place-items-center rounded-2xl bg-blush text-3xl transition group-hover:scale-110"
                >
                  {item.emoji}
                </span>
                <h3 className="mt-6 text-xl font-bold">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={200}>
          {/* gap-px sobre fundo claro desenha as divisórias entre os itens */}
          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] bg-white/25 text-white lg:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label} className="bg-magenta p-6 sm:p-8">
                <dt className="text-xs font-bold tracking-[0.25em] text-white/70 uppercase">{fact.label}</dt>
                <dd className="mt-2 text-xl font-semibold sm:text-2xl">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
