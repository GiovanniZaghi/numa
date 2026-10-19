import eventLogo from "@/assets/brand/numa-experiencia.png";
import grupoBandeira from "@/assets/photos/hero-grupo-bandeira.jpg";
import pilatesParque from "@/assets/photos/hero-pilates-parque.jpg";
import turmaCorreria from "@/assets/photos/hero-turma-correria.jpg";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon, CalendarIcon, ClockIcon, PinIcon, SparkleIcon } from "@/components/ui/icons";
import type { Event } from "@/core/domain/entities/event";
import { formatDayMonth, formatHour, formatMoney, formatShortDate, formatWeekday } from "@/lib/format";
import Image from "next/image";
import { Countdown } from "./countdown";
import { registrationAnchor } from "./navigation";
import { PhotoBackdrop } from "./photo-backdrop";

const photos = [turmaCorreria, pilatesParque, grupoBandeira];

export function HeroSection({ event, isFull = false }: { event: Event; isFull?: boolean }) {
  const hours = `${formatHour(event.startsAt)} — ${formatHour(event.endsAt)}`;

  return (
    <section id="topo" className="relative isolate overflow-hidden bg-magenta pt-32 pb-36 text-white md:pt-40 md:pb-44">
      <PhotoBackdrop photos={photos} opacity={0.35} />
      <div aria-hidden className="absolute inset-0 -z-10 bg-dots" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-grain opacity-[0.15] mix-blend-overlay" />
      <div aria-hidden className="absolute -top-32 -right-24 -z-10 size-[28rem] rounded-full bg-petal/40 blur-3xl" />
      <div aria-hidden className="absolute -bottom-40 -left-32 -z-10 size-[30rem] rounded-full bg-magenta-ink/50 blur-3xl" />

      <Container className="grid items-center gap-16 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.25em] uppercase backdrop-blur-sm">
            <SparkleIcon className="size-3.5 text-petal" />
            {event.organizer} apresenta
          </p>

          <h1 className="mt-8">
            <Image
              src={eventLogo}
              alt={event.name}
              priority
              sizes="(min-width: 1024px) 560px, 90vw"
              className="h-auto w-full max-w-[560px]"
            />
          </h1>

          <p className="mt-8 max-w-lg text-lg leading-relaxed font-light text-white/85 md:text-xl">
            {event.tagline}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href={registrationAnchor} className={buttonVariants({ variant: "light", size: "lg", className: "group" })}>
              {isFull ? "Entrar na fila de espera" : "Garantir minha vaga"}
              <ArrowRightIcon className="size-5 transition group-hover:translate-x-1" />
            </a>
            <a href="#cronograma" className="px-2 text-sm font-semibold tracking-wide text-white/85 underline-offset-8 hover:text-white hover:underline">
              Ver a programação
            </a>
          </div>

          <div className="mt-12">
            <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-white/70 uppercase">Faltam</p>
            <Countdown target={event.startsAt} eventName={event.name} />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:mr-0">
          <RotatingBadge
            text={isFull ? "Vagas esgotadas • Fila de espera aberta •" : "Vagas limitadas • Inscrições abertas •"}
            className="absolute -top-14 -right-6 z-10 size-32 md:-right-12 md:size-36"
          />

          <article
            aria-label="Resumo do ingresso"
            className="relative rotate-2 rounded-[2rem] bg-cream text-ink shadow-2xl shadow-magenta-ink/40 transition duration-500 hover:rotate-0"
          >
            <div className="p-8">
              <p className="text-xs font-bold tracking-[0.3em] text-magenta uppercase">Ingresso</p>
              <p className="mt-3 text-7xl leading-none font-semibold">{formatShortDate(event.startsAt)}</p>
              <p className="mt-2 text-sm text-muted capitalize">{formatWeekday(event.startsAt)}</p>

              <ul className="mt-8 space-y-4 text-sm font-medium">
                <li className="flex items-center gap-3">
                  <CalendarIcon className="size-5 text-magenta" />
                  {formatDayMonth(event.startsAt)}
                </li>
                <li className="flex items-center gap-3">
                  <ClockIcon className="size-5 text-magenta" />
                  {hours}
                </li>
                <li className="flex items-center gap-3">
                  <PinIcon className="size-5 text-magenta" />
                  {event.location.venueName} · {event.location.city}
                </li>
              </ul>
            </div>

            <div aria-hidden className="relative flex items-center">
              <span className="absolute -left-4 size-8 rounded-full bg-magenta" />
              <span className="mx-6 w-full border-t-2 border-dashed border-ink/15" />
              <span className="absolute -right-4 size-8 rounded-full bg-magenta" />
            </div>

            <div className="flex items-end justify-between p-8 pt-6">
              <div>
                <p className="text-xs text-muted">Valor único</p>
                <p className="text-3xl font-semibold text-magenta">{formatMoney(event.price)}</p>
              </div>
              <Barcode />
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}

function RotatingBadge({ text, className }: { text: string; className?: string }) {
  return (
    <div className={className} aria-hidden>
      <div className="relative size-full rounded-full bg-ink text-white shadow-xl">
        <svg viewBox="0 0 100 100" className="size-full animate-spin-slow">
          <defs>
            <path id="badge-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
          </defs>
          {/* textLength = circunferência (2π·37) para o texto fechar a volta sem sobrepor */}
          <text className="fill-current text-[8.5px] font-semibold uppercase">
            <textPath href="#badge-circle" textLength="232" lengthAdjust="spacing">
              {text}
            </textPath>
          </text>
        </svg>
        <SparkleIcon className="absolute inset-0 m-auto size-8 text-petal" />
      </div>
    </div>
  );
}

function Barcode() {
  const bars = [3, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 3, 1, 2, 1];
  return (
    <div aria-hidden className="flex h-10 items-stretch gap-[3px] opacity-80">
      {bars.map((w, i) => (
        <span key={i} className="bg-ink" style={{ width: w }} />
      ))}
    </div>
  );
}
