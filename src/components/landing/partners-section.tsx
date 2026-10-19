import bolsaNuma from "@/assets/photos/parceiros-bolsa-numa.jpg";
import ecobagGrama from "@/assets/photos/parceiros-ecobag-grama.jpg";
import ecobagTag from "@/assets/photos/parceiros-ecobag-tag.jpg";
import tagDetalhe from "@/assets/photos/parceiros-tag-detalhe.jpg";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { InstagramIcon, SparkleIcon } from "@/components/ui/icons";
import type { Event, Partner } from "@/core/domain/entities/event";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Fragment } from "react";
import { InstagramLink } from "./instagram-link";
import { PhotoBackdrop } from "./photo-backdrop";
import { Reveal } from "./reveal";

const photos = [ecobagTag, bolsaNuma, tagDetalhe, ecobagGrama];

export function PartnersSection({ event }: { event: Event }) {
  return (
    <section id="parceiros" className="relative isolate overflow-hidden bg-cream py-24 md:py-32">
      <PhotoBackdrop photos={photos} />
      <Container>
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Rede de apoio"
            title="Marcas que constroem a tarde com a gente"
            description="Parceiras incríveis que cuidam de cada detalhe: das flores ao brunch, da decoração aos mimos."
          />
        </Reveal>
      </Container>

      <Marquee partners={event.partners} />

      <Container>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {event.partners.map((partner, index) => (
            <Reveal as="li" key={partner.name} delay={(index % 4) * 70}>
              <PartnerCard partner={partner} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

// Vertical (logo em cima) nas colunas estreitas do celular/tablet; horizontal a partir do desktop.
const cardClass =
  "group relative flex h-full flex-col items-center gap-3 rounded-2xl border border-ink/8 bg-white px-3 py-5 text-center transition " +
  "lg:flex-row lg:gap-4 lg:p-5 lg:text-left";

function PartnerCard({ partner }: { partner: Partner }) {
  const content = (
    <>
      {partner.logoUrl ? (
        <Image
          src={partner.logoUrl}
          alt=""
          width={56}
          height={56}
          className="size-14 shrink-0 rounded-full object-cover lg:size-12 ring-1 ring-ink/10 transition group-hover:ring-2 group-hover:ring-magenta"
        />
      ) : (
        <span className="grid size-14 shrink-0 place-items-center lg:size-12 rounded-full bg-blush text-lg font-semibold text-magenta transition group-hover:bg-magenta group-hover:text-white">
          {initials(partner.name)}
        </span>
      )}
      <div className="w-full min-w-0 lg:flex-1">
        <p className="leading-tight font-bold [overflow-wrap:anywhere]">{partner.name}</p>
        <p className="mt-1 text-xs leading-snug text-muted">{partner.category}</p>
      </div>
    </>
  );

  if (!partner.instagram) return <div className={cardClass}>{content}</div>;

  return (
    <InstagramLink
      username={partner.instagram}
      aria-label={`${partner.name} no Instagram (@${partner.instagram})`}
      className={cn(
        cardClass,
        "hover:-translate-y-1 hover:border-magenta/30 hover:shadow-lg hover:shadow-magenta/10 active:scale-[0.98]",
      )}
    >
      {content}
      <InstagramIcon className="absolute top-3 right-3 size-4 shrink-0 text-ink/25 transition group-hover:text-magenta lg:static lg:size-5" />
    </InstagramLink>
  );
}

function Marquee({ partners }: { partners: readonly Partner[] }) {
  const items = [...partners, ...partners];
  return (
    <div aria-hidden className="my-14 -rotate-1 bg-magenta py-5 text-white md:my-16">
      <div className="flex w-max animate-marquee items-center gap-8 hover:[animation-play-state:paused]">
        {items.map((partner, i) => (
          <Fragment key={i}>
            <span className="font-script text-4xl whitespace-nowrap md:text-5xl">{partner.name}</span>
            <SparkleIcon className="size-4 shrink-0 text-petal" />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
}
