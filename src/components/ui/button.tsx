import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "light" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-magenta text-white shadow-lg shadow-magenta/25 hover:bg-magenta-deep disabled:bg-magenta/60",
  light: "bg-white text-magenta shadow-xl shadow-magenta-ink/20 hover:bg-blush",
  outline: "border border-current bg-transparent hover:bg-white/10",
  ghost: "bg-transparent hover:bg-magenta/10",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-7 text-sm",
  lg: "h-14 px-9 text-base",
};

export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide whitespace-nowrap",
    "transition duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none",
    variants[variant],
    sizes[size],
    className,
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonVariants({ variant, size, className })} {...props} />;
}
