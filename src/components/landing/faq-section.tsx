import { Container } from "@/components/ui/container";
import { PlusIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Event } from "@/core/domain/entities/event";
import { InstagramLink } from "./instagram-link";
import { instagram } from "./navigation";
import { Reveal } from "./reveal";

export function FaqSection({ event }: { event: Event }) {
  return (
    <section id="faq" className="bg-cream py-24 md:py-32">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        <Reveal>
          <SectionHeading
            eyebrow="Dúvidas"
            title="Perguntas frequentes"
            description={
              <>
                Não encontrou o que procurava? Chama a gente no Instagram{" "}
                <InstagramLink username={instagram.username} className="font-semibold text-magenta underline-offset-4 hover:underline">
                  {instagram.handle}
                </InstagramLink>
                .
              </>
            }
          />
        </Reveal>

        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {event.faq.map((item, index) => (
            <Reveal key={item.question} delay={index * 60}>
              <details className="group py-2" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-left text-lg font-semibold transition hover:text-magenta [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-ink/15 transition group-open:rotate-45 group-open:border-magenta group-open:bg-magenta group-open:text-white">
                    <PlusIcon className="size-4" />
                  </span>
                </summary>
                <p className="max-w-xl pb-5 leading-relaxed text-muted">{item.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
