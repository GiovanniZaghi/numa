"use client";

import { setRegistrationPaidAction } from "@/app/actions/registrations-admin";
import { CheckIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";

interface PaidToggleProps {
  registrationId: string;
  name: string;
  paid: boolean;
}

/** Checkbox "Pago": atualiza na hora (otimista) e desfaz se o servidor recusar. */
export function PaidToggle({ registrationId, name, paid }: PaidToggleProps) {
  const [optimisticPaid, setOptimisticPaid] = useOptimistic(paid);
  const [pending, startTransition] = useTransition();

  function toggle(next: boolean) {
    startTransition(async () => {
      setOptimisticPaid(next);
      const result = await setRegistrationPaidAction(registrationId, next);
      if (!result.ok) toast.error(result.error);
      else toast.success(next ? `${name} marcada como paga` : `Pagamento de ${name} desmarcado`);
    });
  }

  return (
    <label
      className={cn(
        "inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold transition select-none",
        optimisticPaid
          ? "border-emerald-600/30 bg-emerald-50 text-emerald-700"
          : "border-ink/15 bg-white text-muted hover:border-magenta/40",
        pending && "opacity-60",
      )}
    >
      <span className="relative grid size-5 place-items-center">
        <input
          type="checkbox"
          checked={optimisticPaid}
          disabled={pending}
          onChange={(e) => toggle(e.target.checked)}
          aria-label={`Pago: ${name}`}
          className="peer size-5 cursor-pointer appearance-none rounded-md border-2 border-ink/25 bg-white transition checked:border-emerald-600 checked:bg-emerald-600"
        />
        <CheckIcon className="pointer-events-none absolute size-3.5 text-white opacity-0 peer-checked:opacity-100" />
      </span>
      Pago
    </label>
  );
}
