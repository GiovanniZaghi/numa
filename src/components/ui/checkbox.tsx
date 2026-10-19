import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, ReactNode } from "react";
import { FieldError } from "./field";
import { CheckIcon } from "./icons";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  id: string;
  children: ReactNode;
  error?: string;
}

export function Checkbox({ id, children, error, className, ...props }: CheckboxProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="group flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted">
        <span className="relative mt-0.5 grid size-5 shrink-0 place-items-center">
          <input
            id={id}
            type="checkbox"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            className={cn(
              "peer size-5 cursor-pointer appearance-none rounded-md border-2 border-ink/20 bg-white transition",
              "checked:border-magenta checked:bg-magenta aria-invalid:border-red-500",
            )}
            {...props}
          />
          <CheckIcon className="pointer-events-none absolute size-3.5 text-white opacity-0 transition peer-checked:opacity-100" />
        </span>
        <span>{children}</span>
      </label>
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </div>
  );
}
