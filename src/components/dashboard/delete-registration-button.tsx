"use client";

import { deleteRegistrationAction } from "@/app/actions/registrations-admin";
import { TrashIcon } from "@/components/ui/icons";
import { useRef, useTransition } from "react";
import { toast } from "sonner";

interface DeleteRegistrationButtonProps {
  registrationId: string;
  fullName: string;
  protocol: string;
  whatsapp: string;
  paid: boolean;
}

/** Lixeira com modal de confirmação (dialog nativo: bloqueia o fundo e fecha com Esc). */
export function DeleteRegistrationButton({ registrationId, fullName, protocol, whatsapp, paid }: DeleteRegistrationButtonProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [pending, startTransition] = useTransition();

  function confirmDelete() {
    startTransition(async () => {
      const result = await deleteRegistrationAction(registrationId);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      dialogRef.current?.close();
      toast.success(`Inscrição de ${fullName} excluída`);
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        aria-label={`Excluir inscrição de ${fullName}`}
        title="Excluir inscrição"
        className="grid size-9 shrink-0 place-items-center rounded-full border border-ink/12 bg-white text-muted transition hover:border-red-300 hover:bg-red-50 hover:text-red-600"
      >
        <TrashIcon className="size-4" />
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={`delete-title-${registrationId}`}
        onClick={(e) => e.target === dialogRef.current && !pending && dialogRef.current?.close()}
        className="m-auto w-[calc(100%-2.5rem)] max-w-md rounded-3xl bg-white p-0 text-ink shadow-2xl backdrop:bg-ink/50 backdrop:backdrop-blur-sm"
      >
        <div className="p-7">
          <span className="grid size-12 place-items-center rounded-full bg-red-50 text-red-600">
            <TrashIcon className="size-6" />
          </span>
          <h2 id={`delete-title-${registrationId}`} className="mt-5 text-xl font-semibold">
            Excluir esta inscrição?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Esta ação não pode ser desfeita. Se a inscrição ocupava uma vaga, ela volta a ficar livre.
          </p>

          <dl className="mt-5 space-y-1.5 rounded-2xl bg-cream p-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Nome</dt>
              <dd className="text-right font-semibold">{fullName}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">WhatsApp</dt>
              <dd className="font-medium">{whatsapp}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Protocolo</dt>
              <dd className="font-mono">#{protocol}</dd>
            </div>
          </dl>

          {paid && (
            <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
              Atenção: esta inscrição está marcada como <strong>paga</strong>.
            </p>
          )}

          <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              disabled={pending}
              autoFocus
              className="h-11 rounded-full border border-ink/15 px-5 text-sm font-semibold transition hover:bg-cream"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={confirmDelete}
              disabled={pending}
              className="h-11 rounded-full bg-red-600 px-5 text-sm font-semibold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 disabled:opacity-60"
            >
              {pending ? "Excluindo…" : "Sim, excluir"}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
