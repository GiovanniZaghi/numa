"use client";

import { registerAttendeeAction, type RegistrationActionState } from "@/app/actions/registration";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { CheckIcon, ClockIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect, type FormEvent } from "react";
import { toast } from "sonner";

const initialState: RegistrationActionState = { status: "idle" };

function maskPhone(e: FormEvent<HTMLInputElement>) {
  const digits = e.currentTarget.value.replace(/\D/g, "").slice(0, 11);
  const ddd = digits.slice(0, 2);
  const rest = digits.slice(2);
  const split = rest.length > 8 ? 5 : 4;
  e.currentTarget.value = !digits
    ? ""
    : digits.length <= 2
      ? `(${ddd}`
      : `(${ddd}) ${rest.slice(0, split)}${rest.length > split ? `-${rest.slice(split)}` : ""}`;
}

interface RegistrationFormProps {
  eventSlug: string;
  cancellationWindowHours: number;
  /** Vagas esgotadas: o formulário vira inscrição na fila de espera. */
  waitlistMode?: boolean;
}

export function RegistrationForm({ eventSlug, cancellationWindowHours, waitlistMode = false }: RegistrationFormProps) {
  const [state, formAction, pending] = useActionState(registerAttendeeAction, initialState);

  useEffect(() => {
    if (state.status === "error") toast.error(state.message);
    if (state.status === "success") {
      toast.success(state.waitlisted ? "Você entrou na fila de espera!" : "Inscrição pré-confirmada!");
    }
  }, [state]);

  // O servidor é quem decide: mesmo com a página desatualizada, quem chegar depois da última vaga cai na fila.
  if (state.status === "success" && state.waitlisted) {
    return (
      <div className="flex flex-col items-center py-6 text-center" aria-live="polite">
        <span className="grid size-16 place-items-center rounded-full bg-ink text-white shadow-lg shadow-ink/20">
          <ClockIcon className="size-8" />
        </span>
        <h3 className="mt-6 text-3xl font-semibold">Você está na fila!</h3>
        {state.waitlistPosition && (
          <p className="mt-4 text-sm text-muted">
            Sua posição: <strong className="text-2xl text-magenta">{state.waitlistPosition}º</strong>
          </p>
        )}
        <p className="mt-3 max-w-sm leading-relaxed text-muted">
          As vagas estão esgotadas, mas se alguma abrir, avisamos você pelo WhatsApp, seguindo a ordem da fila.
          <strong className="text-ink"> Não faça nenhum pagamento agora.</strong>
        </p>
        <p className="mt-4 rounded-full bg-blush px-4 py-1.5 text-xs font-bold tracking-widest text-magenta uppercase">
          Protocolo {state.protocol}
        </p>
      </div>
    );
  }

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center py-6 text-center" aria-live="polite">
        <span className="grid size-16 place-items-center rounded-full bg-magenta text-white shadow-lg shadow-magenta/30">
          <CheckIcon className="size-8" />
        </span>
        <h3 className="mt-6 text-3xl font-semibold">Quase lá!</h3>
        <p className="mt-3 max-w-sm leading-relaxed text-muted">
          Seus dados foram registrados. Agora é só enviar o comprovante do Pix no WhatsApp para garantir sua vaga.
        </p>
        <p className="mt-4 rounded-full bg-blush px-4 py-1.5 text-xs font-bold tracking-widest text-magenta uppercase">
          Protocolo {state.protocol}
        </p>
        <a
          href={state.confirmationUrl}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants({ size: "lg", className: "mt-8 w-full bg-[#1fa855] shadow-[#1fa855]/25 hover:bg-[#178a45]" })}
        >
          <WhatsAppIcon className="size-5" />
          Enviar comprovante no WhatsApp
        </a>
      </div>
    );
  }

  const errors = state.status === "error" ? state.fieldErrors : {};
  const values = state.status === "error" ? state.values : {};
  const invalid = (field: keyof typeof errors) =>
    errors[field] ? { "aria-invalid": true, "aria-describedby": `${field}-error` } : {};

  return (
    <form action={formAction} noValidate className="space-y-5">
      <input type="hidden" name="eventSlug" value={eventSlug} />

      <Field id="fullName" label="Nome completo" error={errors.fullName}>
        <Input
          id="fullName"
          name="fullName"
          autoComplete="name"
          required
          placeholder="Como está no seu documento"
          defaultValue={values.fullName}
          {...invalid("fullName")}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="whatsapp" label="WhatsApp" error={errors.whatsapp}>
          <Input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            required
            placeholder="(11) 98765-4321"
            onInput={maskPhone}
            defaultValue={values.whatsapp}
            {...invalid("whatsapp")}
          />
        </Field>
        <Field id="emergencyContact" label="Contato de emergência" error={errors.emergencyContact}>
          <Input
            id="emergencyContact"
            name="emergencyContact"
            required
            placeholder="Nome e telefone"
            defaultValue={values.emergencyContact}
            {...invalid("emergencyContact")}
          />
        </Field>
      </div>

      <div className="space-y-4 rounded-2xl bg-blush/60 p-5">
        <Checkbox id="imageConsent" name="imageConsent" defaultChecked={!!values.imageConsent} error={errors.imageConsent}>
          Autorizo o <strong className="text-ink">uso da minha imagem</strong> em fotos e vídeos do evento para divulgação do Numa Club.
        </Checkbox>
        <Checkbox
          id="cancellationPolicyAccepted"
          name="cancellationPolicyAccepted"
          defaultChecked={!!values.cancellationPolicyAccepted}
          error={errors.cancellationPolicyAccepted}
        >
          Estou ciente de que reembolsos ou transferências só são aceitos com até{" "}
          <strong className="text-ink">{cancellationWindowHours} horas</strong> de antecedência.
        </Checkbox>
      </div>

      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? "Enviando…" : waitlistMode ? "Entrar na fila de espera" : "Confirmar inscrição"}
      </Button>
      <p className="text-center text-xs text-muted">
        {waitlistMode
          ? "Sem pagamento agora: se uma vaga abrir, avisamos pelo WhatsApp."
          : "Na próxima etapa você envia o comprovante do Pix pelo WhatsApp."}
      </p>
    </form>
  );
}
