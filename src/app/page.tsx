import { DressCodeSection } from "@/components/landing/dress-code-section";
import { FaqSection } from "@/components/landing/faq-section";
import { HeroSection } from "@/components/landing/hero-section";
import { LocationSection } from "@/components/landing/location-section";
import { ManifestoSection } from "@/components/landing/manifesto-section";
import { MobileCta } from "@/components/landing/mobile-cta";
import { PartnersSection } from "@/components/landing/partners-section";
import { RegistrationSection } from "@/components/landing/registration/registration-section";
import { ScheduleSection } from "@/components/landing/schedule-section";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { container, CURRENT_EVENT_SLUG } from "@/core/container";
import type { Event } from "@/core/domain/entities/event";
import { formatMoney } from "@/lib/format";
import type { Metadata } from "next";
import { cache } from "react";

// Página estática, regenerada a cada nova inscrição (revalidatePath) e, por segurança, a cada minuto.
export const revalidate = 60;

const getEvent = cache(() => container.getEvent.execute(CURRENT_EVENT_SLUG));

/** Sem banco disponível (ex.: build sem DATABASE_URL), a página assume vagas abertas; o servidor decide na inscrição. */
async function getIsFull(): Promise<boolean> {
  try {
    return (await container.getEventAvailability.execute(CURRENT_EVENT_SLUG)).isFull;
  } catch (error) {
    console.warn("[home] disponibilidade indisponível:", error instanceof Error ? error.message : error);
    return false;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const event = await getEvent();
  return {
    title: event.name,
    description: event.tagline,
    openGraph: { title: `${event.name} | ${event.organizer}`, description: event.tagline, locale: "pt_BR", type: "website" },
  };
}

export default async function HomePage() {
  const [event, isFull] = await Promise.all([getEvent(), getIsFull()]);

  return (
    <>
      <SiteHeader isFull={isFull} />
      <main>
        <HeroSection event={event} isFull={isFull} />
        <ManifestoSection event={event} />
        <ScheduleSection event={event} />
        <PartnersSection event={event} />
        <DressCodeSection event={event} />
        <RegistrationSection event={event} isFull={isFull} />
        <LocationSection event={event} />
        <FaqSection event={event} />
      </main>
      <SiteFooter />
      <MobileCta price={formatMoney(event.price)} isFull={isFull} />
      <EventJsonLd event={event} isFull={isFull} />
    </>
  );
}

function EventJsonLd({ event, isFull }: { event: Event; isFull: boolean }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.tagline,
    startDate: event.startsAt.toISOString(),
    endDate: event.endsAt.toISOString(),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.location.venueName,
      address: {
        "@type": "PostalAddress",
        streetAddress: event.location.street,
        addressLocality: event.location.city,
        addressRegion: event.location.state,
        postalCode: event.location.postalCode,
        addressCountry: "BR",
      },
    },
    organizer: { "@type": "Organization", name: event.organizer },
    offers: {
      "@type": "Offer",
      price: (event.price.amountInCents / 100).toFixed(2),
      priceCurrency: event.price.currency,
      availability: isFull ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
