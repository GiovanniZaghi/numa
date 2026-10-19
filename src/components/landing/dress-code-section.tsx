import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Event } from "@/core/domain/entities/event";
import { cn } from "@/lib/utils";
import { LookPolaroids } from "./look-polaroids";
import { Reveal } from "./reveal";

export function DressCodeSection({ event }: { event: Event }) {
  return (
    <section id="dresscode" className="overflow-hidden bg-blush py-24 md:py-32">
      <Container className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
        <div>
          <Reveal>
            <SectionHeading
              eyebrow="Guia de estilo"
              title={
                <>
                  Dress code: <em className="font-normal text-magenta">rosa, branco</em> e muito conforto
                </>
              }
            />
          </Reveal>

          <div className="mt-14 grid gap-6">
            {event.dressCode.map((rule, index) => (
              <Reveal key={rule.title} delay={index * 120}>
                <article
                  className={cn(
                    "flex h-full flex-col rounded-[2rem] p-8 md:p-10",
                    index === 0 ? "bg-magenta text-white" : "bg-white text-ink",
                  )}
                >
                  <div className="flex items-start justify-between gap-6">
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase",
                        index === 0 ? "bg-white/15" : "bg-ink/5",
                      )}
                    >
                      {rule.audience}
                    </span>
                    <ul className="flex -space-x-3">
                      {rule.palette.map((color) => (
                        <li
                          key={color.name}
                          title={color.name}
                          className="size-11 rounded-full border-4 border-current/10 shadow-md ring-1 ring-black/5"
                          style={{ backgroundColor: color.hex }}
                        >
                          <span className="sr-only">{color.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <h3 className="mt-14 text-3xl font-semibold">{rule.title}</h3>
                  <p className={cn("mt-4 leading-relaxed", index === 0 ? "text-white/80" : "text-muted")}>
                    {rule.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={150}>
          <p className="mb-6 text-center text-xs font-bold tracking-[0.3em] text-magenta uppercase lg:mb-10">
            Inspirações de look
          </p>
          <LookPolaroids />
        </Reveal>
      </Container>
    </section>
  );
}
