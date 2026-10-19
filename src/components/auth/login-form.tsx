"use client";

import { loginAction, type LoginActionState } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";

const initialState: LoginActionState = {};

export function LoginForm({ next }: { next?: string }) {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="next" value={next ?? "/dashboard"} />
      <Field id="password" label="Senha do painel" error={state.error}>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          aria-invalid={state.error ? true : undefined}
          aria-describedby={state.error ? "password-error" : undefined}
        />
      </Field>
      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? "Entrando…" : "Entrar"}
      </Button>
    </form>
  );
}
