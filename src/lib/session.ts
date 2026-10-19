import "server-only";
import { requireEnv } from "@/core/infrastructure/config/env";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signSessionToken, verifySessionToken } from "./session-token";

export const SESSION_COOKIE = "numa_admin";
const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 horas

export async function createSession(): Promise<void> {
  const token = await signSessionToken(requireEnv("SESSION_SECRET"), SESSION_TTL_SECONDS);
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function deleteSession(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE);
}

export async function isAdmin(): Promise<boolean> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return verifySessionToken(requireEnv("SESSION_SECRET"), token);
}

/** Garante sessão válida em páginas, actions e rotas do painel (além do proxy). */
export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) redirect("/login");
}
