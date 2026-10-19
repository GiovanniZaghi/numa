"use server";

import { requireEnv } from "@/core/infrastructure/config/env";
import { createSession, deleteSession } from "@/lib/session";
import { timingSafeEqual } from "node:crypto";
import { redirect } from "next/navigation";

export type LoginActionState = { error?: string };

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

/** Só permite voltar para caminhos internos do painel. */
function safeNext(value: FormDataEntryValue | null): string {
  return typeof value === "string" && value.startsWith("/dashboard") ? value : "/dashboard";
}

export async function loginAction(_prev: LoginActionState, formData: FormData): Promise<LoginActionState> {
  const password = String(formData.get("password") ?? "");

  let expected: string;
  try {
    expected = requireEnv("ADMIN_PASSWORD");
    requireEnv("SESSION_SECRET");
  } catch {
    return { error: "Painel ainda não configurado: defina ADMIN_PASSWORD e SESSION_SECRET no .env.local." };
  }

  if (!safeEqual(password, expected)) {
    // Pequeno atraso para dificultar tentativas em sequência.
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { error: "Senha incorreta." };
  }

  await createSession();
  redirect(safeNext(formData.get("next")));
}

export async function logoutAction(): Promise<void> {
  await deleteSession();
  redirect("/login");
}
