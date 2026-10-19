"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { registrationAnchor } from "./navigation";

/** Barra fixa no mobile: aparece depois do hero e some quando o formulário está visível. */
export function MobileCta({ price, isFull = false }: { price: string; isFull?: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("topo");
    const form = document.getElementById("inscricao");
    if (!hero || !form) return;

    const state = { heroVisible: true, formVisible: false };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) state.heroVisible = entry.isIntersecting;
        if (entry.target === form) state.formVisible = entry.isIntersecting;
      }
      setVisible(!state.heroVisible && !state.formVisible);
    });
    observer.observe(hero);
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-3 bottom-3 z-40 flex items-center justify-between gap-3 rounded-full bg-ink/95 py-2 pr-2 pl-6 text-white shadow-2xl backdrop-blur-md transition duration-500 md:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0",
      )}
    >
      <div className="leading-tight">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-white/60 uppercase">{isFull ? "Vagas esgotadas" : "Ingresso"}</p>
        <p className="text-lg font-semibold">{isFull ? "Fila de espera" : price}</p>
      </div>
      <a href={registrationAnchor} tabIndex={visible ? 0 : -1} className={buttonVariants({ size: "sm" })}>
        {isFull ? "Entrar na fila" : "Garantir vaga"}
      </a>
    </div>
  );
}
