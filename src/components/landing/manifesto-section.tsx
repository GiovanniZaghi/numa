import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Event } from "@/core/domain/entities/event";
import convidada from "@/assets/photos/manifesto-convidada.jpg";
import entregaPresentes from "@/assets/photos/manifesto-entrega-presentes.jpg";
import lencinhoRosa from "@/assets/photos/manifesto-lencinho-rosa.jpg";
import sorrisoPresentes from "@/assets/photos/manifesto-sorriso-presentes.jpg";
import { PhotoBackdrop } from "./photo-backdrop";
import { Reveal } from "./reveal";

const photos = [sorrisoPresentes, lencinhoRosa, entregaPresentes, convidada];

export function ManifestoSection({ event }: { event: Event }) {
  return (
    <section id="sobre" className="relative isolate -mt-12 overflow-hidden rounded-t-[3rem] bg-cream py-24 md:py-32">
      <PhotoBackdrop photos={photos} />
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="O manifesto"
              title={
                <>
                  Mais que um clube, <em className="font-normal text-magenta">um ecossistema</em> de mulheres.
                </>
              }
            />
          </Reveal>
          <Reveal delay={120}>
            <p className="text-xl leading-relaxed font-light text-ink/90 md:text-2xl">
              <span className="float-left mt-1 mr-3 text-7xl leading-[0.8] text-magenta">“</span>
              {event.manifesto}
            </p>
          </Reveal>
        </div>

        <ol className="mt-20 grid gap-px overflow-hidden rounded-[2rem] bg-ink/10 md:grid-cols-3">
          {event.pillars.map((pillar, index) => (
            <Reveal as="li" key={pillar.title} delay={index * 120} className="group bg-cream p-8 transition hover:bg-white md:p-10">
              <span className="font-script text-6xl text-magenta/30 transition group-hover:text-magenta">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-lg font-bold">{pillar.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{pillar.description}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
