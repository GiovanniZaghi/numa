"use client";

import { buttonVariants } from "@/components/ui/button";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { navigation, registrationAnchor } from "./navigation";

export function SiteHeader({ isFull = false }: { isFull?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 text-white transition-all duration-500",
        solid ? "bg-magenta/90 shadow-lg shadow-magenta-ink/10 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 md:px-8">
        <a href="#topo" aria-label="Numa Club — início" onClick={() => setOpen(false)}>
          <Logo priority className="h-13" />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-8 text-sm font-medium lg:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 text-white/85 transition hover:text-white after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-white after:transition hover:after:scale-x-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={registrationAnchor} className={buttonVariants({ variant: "light", size: "sm", className: "hidden sm:inline-flex" })}>
            {isFull ? "Entrar na fila" : "Garantir ingresso"}
          </a>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full transition hover:bg-white/10 lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Menu mobile"
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows] duration-500 lg:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0">
          <ul className="flex flex-col gap-1 px-5 pt-2 pb-6">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/10 py-4 text-2xl"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <a
                href={registrationAnchor}
                onClick={() => setOpen(false)}
                className={buttonVariants({ variant: "light", size: "lg", className: "w-full" })}
              >
                {isFull ? "Entrar na fila de espera" : "Garantir meu ingresso"}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
