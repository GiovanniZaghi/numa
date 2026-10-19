import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
}: SectionHeadingProps) {
  const light = tone === "light";
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-2xl", className)}>
      <span
        className={cn(
          "inline-flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase",
          light ? "text-petal" : "text-magenta",
        )}
      >
        <span aria-hidden className={cn("h-px w-8", light ? "bg-petal" : "bg-magenta")} />
        {eyebrow}
      </span>
      <h2
        className={cn(
          "mt-4 text-4xl leading-[1.05] font-semibold text-balance md:text-5xl",
          light ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-5 text-base leading-relaxed md:text-lg", light ? "text-white/75" : "text-muted")}>
          {description}
        </p>
      )}
    </div>
  );
}
