"use client";

import { CheckIcon, CopyIcon } from "@/components/ui/icons";
import { useState } from "react";
import { toast } from "sonner";

export function PixKey({ value }: { value: string | null }) {
  const [copied, setCopied] = useState(false);

  if (!value) {
    return (
      <p className="rounded-2xl border border-dashed border-white/30 px-4 py-3 text-sm text-white/75">
        A chave Pix é enviada no WhatsApp junto com a confirmação.
      </p>
    );
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(value!);
      setCopied(true);
      toast.success("Chave Pix copiada!");
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Não foi possível copiar. Selecione e copie manualmente.");
    }
  }

  return (
    <div className="flex items-center gap-2 rounded-2xl bg-white/10 p-1.5 pl-4 ring-1 ring-white/20">
      <code className="min-w-0 flex-1 truncate font-mono text-sm select-all">{value}</code>
      <button
        type="button"
        onClick={copy}
        className="inline-flex h-10 items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-magenta transition hover:bg-blush"
      >
        {copied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
        {copied ? "Copiada" : "Copiar"}
      </button>
    </div>
  );
}
