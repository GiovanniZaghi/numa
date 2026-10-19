import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon, PinIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { fullAddress, type Event } from "@/core/domain/entities/event";
import { Reveal } from "./reveal";

export function LocationSection({ event }: { event: Event }) {
  const { location } = event;
  const query = encodeURIComponent(fullAddress(location));

  return (
    <section id="local" className="bg-blush py-24 md:py-32">
      <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="Local"
            title={
              <>
                Nos vemos em <em className="font-normal text-magenta">{location.city}</em>
              </>
            }
          />

          <address className="mt-8 flex gap-4 not-italic">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-magenta">
              <PinIcon className="size-6" />
            </span>
            <span className="leading-relaxed">
              <span className="block text-2xl font-semibold">{location.venueName}</span>
              <span className="mt-1 block font-semibold">{location.street}</span>
              <span className="block text-muted">
                {location.neighborhood}, {location.city} - {location.state}
              </span>
              <span className="block text-sm text-muted">CEP {location.postalCode}</span>
            </span>
          </address>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${query}`}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ className: "group" })}
            >
              Como chegar
              <ArrowRightIcon className="size-4 transition group-hover:translate-x-1" />
            </a>
            <a
              href={`https://waze.com/ul?q=${query}&navigate=yes`}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: "ghost", className: "border border-magenta/30 text-magenta" })}
            >
              Abrir no Waze
            </a>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="overflow-hidden rounded-[2rem] border border-ink/10 bg-white shadow-xl shadow-magenta/10">
            <iframe
              title={`Mapa: ${fullAddress(location)}`}
              src={`https://maps.google.com/maps?q=${query}&z=16&output=embed`}
              className="block aspect-[4/3] w-full md:aspect-[16/11]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
