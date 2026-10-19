import eventLogo from "@/assets/brand/numa-experiencia.png";
import { Container } from "@/components/ui/container";
import { CheckIcon, ClockIcon, WhatsAppIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Event } from "@/core/domain/entities/event";
import { formatPhone } from "@/core/domain/value-objects/phone";
import { formatMoney } from "@/lib/format";
import Image from "next/image";
import { Reveal } from "../reveal";
import { PixKey } from "./pix-key";
import { RegistrationForm } from "./registration-form";

const steps = ["Preencha seus dados", "Faça o Pix", "Envie o comprovante no WhatsApp"];

const labelClass = "mb-3 text-xs font-semibold tracking-[0.25em] text-white/60 uppercase";

export function RegistrationSection({ event, isFull = false }: { event: Event; isFull?: boolean }) {
  return (
    <section id="inscricao" className="relative isolate overflow-hidden bg-magenta-ink py-24 text-white md:py-32">
      <div aria-hidden className="absolute inset-0 -z-10 bg-dots opacity-50" />
      <div aria-hidden className="absolute top-1/3 -left-40 -z-10 size-[34rem] rounded-full bg-magenta/50 blur-3xl" />

      <Container className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        {/* Faixa 1: oferta à esquerda, formulário à direita */}
        <Reveal>
          <SectionHeading
            tone="light"
            eyebrow={isFull ? "Vagas esgotadas" : "Inscrições abertas"}
            title={
              <>
                {isFull ? "Entre na fila de espera da" : "Garanta sua vaga na"}
                {/* Logo do evento no lugar do nome, para manter a tipografia da marca */}
                <Image src={eventLogo} alt={event.name} sizes="320px" className="mt-4 block h-auto w-full max-w-[320px]" />
              </>
            }
          />

          {isFull && (
            <div className="mt-8 flex gap-4 rounded-3xl border border-petal/30 bg-white/10 p-5 backdrop-blur-sm">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-petal/20 text-petal">
                <ClockIcon className="size-6" />
              </span>
              <div>
                <p className="font-semibold">As {event.capacity} vagas foram preenchidas 💗</p>
                <p className="mt-1 text-sm leading-relaxed text-white/75">
                  Mas ainda dá para participar: entre na fila de espera. Se alguma vaga abrir, chamamos pelo WhatsApp,
                  por ordem de inscrição. Não é preciso pagar nada agora.
                </p>
              </div>
            </div>
          )}

          <div className="mt-10 flex items-baseline gap-3">
            <span className="text-6xl font-semibold md:text-7xl">{formatMoney(event.price)}</span>
            <span className="text-sm text-white/60">por pessoa</span>
          </div>

          <ul className="mt-8 space-y-3">
            {event.inclusions.map((item) => (
              <li key={item} className="flex items-center gap-3 text-white/85">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-petal/20 text-petal">
                  <CheckIcon className="size-3.5" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={150}>
          <div className="rounded-[2.5rem] bg-cream p-6 text-ink shadow-2xl shadow-black/30 sm:p-10">
            <RegistrationForm
              eventSlug={event.slug}
              cancellationWindowHours={event.cancellationWindowHours}
              waitlistMode={isFull}
            />
          </div>
        </Reveal>

        {/* Faixa 2: como concluir a inscrição (Pix). Some quando as vagas esgotam. */}
        {!isFull && <PaymentInstructions event={event} />}
      </Container>
    </section>
  );
}

function PaymentInstructions({ event }: { event: Event }) {
  const whatsapp = event.contact.whatsapp
    ? { raw: event.contact.whatsapp, display: formatPhone(event.contact.whatsapp) }
    : null;

  return (
    <Reveal className="border-t border-white/10 pt-12 lg:col-span-2">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <p className={labelClass}>Como garantir sua vaga</p>
          <ol className="grid gap-4 sm:grid-cols-3">
            {steps.map((step, i) => (
              <li key={step} className="rounded-2xl border border-white/15 p-4">
                <span className="font-script text-4xl text-petal">{i + 1}</span>
                <p className="mt-2 text-sm leading-snug font-medium">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
          <div>
            <p className={labelClass}>Chave Pix oficial</p>
            <PixKey value={event.payment.key} />
          </div>

          {whatsapp && (
            <div>
              <p className={labelClass}>WhatsApp para o comprovante</p>
              <a
                href={`https://wa.me/55${whatsapp.raw}`}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-2xl bg-white/10 p-1.5 pl-4 ring-1 ring-white/20 transition hover:bg-white/15"
              >
                <WhatsAppIcon className="size-5 shrink-0 text-[#4ade80]" />
                <span className="min-w-0 flex-1 truncate text-base font-semibold tracking-wide">{whatsapp.display}</span>
                <span className="inline-flex h-10 items-center rounded-xl bg-white px-4 text-sm font-semibold text-magenta transition group-hover:bg-blush">
                  Abrir
                </span>
              </a>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}
