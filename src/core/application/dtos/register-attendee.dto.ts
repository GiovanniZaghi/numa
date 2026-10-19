import { z } from "zod";

const checkbox = z
  .union([z.literal("on"), z.literal("true"), z.boolean()])
  .optional()
  .transform((value) => value === true || value === "on" || value === "true");

export const registerAttendeeSchema = z.object({
  eventSlug: z.string().min(1),
  fullName: z.string().trim().min(5, "Informe seu nome completo.").max(120),
  whatsapp: z.string().trim().min(10, "Informe um WhatsApp com DDD.").max(20),
  emergencyContact: z
    .string()
    .trim()
    .min(8, "Informe nome e telefone de um contato.")
    .max(120),
  imageConsent: checkbox,
  cancellationPolicyAccepted: checkbox,
});

export type RegisterAttendeeDTO = z.output<typeof registerAttendeeSchema>;

export interface RegisterAttendeeOutput {
  registrationId: string;
  confirmationUrl: string;
  /** true quando as vagas já estavam esgotadas e a pessoa entrou na fila. */
  waitlisted: boolean;
  waitlistPosition: number | null;
}
