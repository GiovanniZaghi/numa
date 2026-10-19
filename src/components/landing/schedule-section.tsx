import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Event } from "@/core/domain/entities/event";
import { formatHour } from "@/lib/format";
import { Reveal } from "./reveal";

export function ScheduleSection({ event }: { event: Event }) {
  return (
    <section id="cronograma" className="bg-blush py-24 md:py-32">
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <SectionHeading
              eyebrow="Programação"
              title="Uma tarde pensada do começo ao fim"
              description="Movimento, criatividade, sabores e boas conversas, no ritmo certo para você aproveitar cada momento."
            />
            <p className="mt-10 text-6xl font-semibold text-magenta md:text-7xl">
              {formatHour(event.startsAt)}
              <span className="mx-3 font-light text-ink/25">→</span>
              {formatHour(event.endsAt)}
            </p>
          </Reveal>
        </div>

        <ol className="relative">
          <span aria-hidden className="absolute top-3 bottom-3 left-[5.25rem] w-px bg-magenta/20 md:left-[6.5rem]" />
          {event.schedule.map((item, index) => (
            <Reveal as="li" key={item.time} delay={index * 60} className="group relative flex gap-6 py-5 md:gap-10">
              <time className="w-16 shrink-0 pt-0.5 text-right text-2xl font-semibold text-magenta tabular-nums md:w-20 md:text-3xl">
                {item.time}
              </time>
              <span
                aria-hidden
                className="relative z-10 mt-3 size-3 shrink-0 rounded-full border-2 border-magenta bg-blush transition group-hover:scale-150 group-hover:bg-magenta"
              />
              <div className="flex-1 rounded-2xl bg-white/70 p-5 shadow-sm shadow-magenta/5 transition group-hover:bg-white group-hover:shadow-md md:p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  {item.tag && (
                    <span className="rounded-full bg-magenta/10 px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-magenta uppercase">
                      {item.tag}
                    </span>
                  )}
                </div>
                {item.description && <p className="mt-1 text-sm leading-relaxed text-muted">{item.description}</p>}
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
