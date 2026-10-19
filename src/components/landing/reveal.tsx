"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}

/**
 * Anima a entrada do conteúdo quando ele entra na viewport.
 * O conteúdo nasce visível no HTML e só é escondido depois que o JS assume,
 * então nada some se o JavaScript falhar ou demorar a carregar.
 */
export function Reveal({ children, delay = 0, className, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    node.dataset.visible = "false";

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Espera um frame para o estado escondido ser pintado e a transição acontecer.
          frame = requestAnimationFrame(() => {
            frame = requestAnimationFrame(() => (node.dataset.visible = "true"));
          });
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("reveal", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
