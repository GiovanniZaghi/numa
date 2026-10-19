import { cn } from "@/lib/utils";
import type { LabelHTMLAttributes, ReactNode } from "react";

export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("mb-2 block text-xs font-bold tracking-widest text-ink/80 uppercase", className)}
      {...props}
    />
  );
}

export function FieldError({ id, children }: { id: string; children?: ReactNode }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm font-medium text-red-600">
      {children}
    </p>
  );
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}

export function Field({ id, label, error, hint, children, className }: FieldProps) {
  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </div>
  );
}
