import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

const fieldBase =
  "w-full rounded-2xl border border-ink/12 bg-white px-4 text-[15px] text-ink placeholder:text-muted/60 " +
  "transition focus:border-magenta focus:ring-4 focus:ring-magenta/15 focus:outline-none " +
  "aria-invalid:border-red-500 aria-invalid:ring-4 aria-invalid:ring-red-500/10";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldBase, "h-13", className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(fieldBase, "min-h-28 resize-y py-3.5", className)} {...props} />;
}
