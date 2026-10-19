import "server-only";
import { z } from "zod";

const optional = (value: string | undefined) => value || undefined;

const envSchema = z.object({
  WHATSAPP_NUMBER: z
    .string()
    .regex(/^\d{12,13}$/, "WHATSAPP_NUMBER deve conter DDI + DDD + número, só dígitos")
    .optional(),
  PIX_KEY: z.string().trim().min(1).optional(),
  DATABASE_URL: z.url("DATABASE_URL deve ser uma URL postgresql://…").optional(),
  ADMIN_PASSWORD: z.string().min(8, "ADMIN_PASSWORD precisa de pelo menos 8 caracteres").optional(),
  SESSION_SECRET: z.string().min(32, "SESSION_SECRET precisa de pelo menos 32 caracteres").optional(),
});

export const env = envSchema.parse({
  WHATSAPP_NUMBER: optional(process.env.WHATSAPP_NUMBER),
  PIX_KEY: optional(process.env.PIX_KEY),
  DATABASE_URL: optional(process.env.DATABASE_URL),
  ADMIN_PASSWORD: optional(process.env.ADMIN_PASSWORD),
  SESSION_SECRET: optional(process.env.SESSION_SECRET),
});

/** Para variáveis que só são obrigatórias quando a funcionalidade é usada (ex.: painel). */
export function requireEnv<K extends keyof typeof env>(key: K): NonNullable<(typeof env)[K]> {
  const value = env[key];
  if (value === undefined) {
    throw new Error(`Variável de ambiente ${key} não configurada. Veja o .env.example.`);
  }
  return value as NonNullable<(typeof env)[K]>;
}
