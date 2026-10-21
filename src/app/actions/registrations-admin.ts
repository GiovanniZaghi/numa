"use server";

import { container } from "@/core/container";
import { DomainError } from "@/core/domain/errors";
import { requireAdmin } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const inputSchema = z.object({ registrationId: z.uuid(), paid: z.boolean() });

export type SetPaidResult = { ok: true; paidAt: string | null } | { ok: false; error: string };

export async function setRegistrationPaidAction(registrationId: string, paid: boolean): Promise<SetPaidResult> {
  await requireAdmin();

  const parsed = inputSchema.safeParse({ registrationId, paid });
  if (!parsed.success) return { ok: false, error: "Dados inválidos." };

  try {
    const updated = await container.setRegistrationPaid.execute(parsed.data);
    revalidatePath("/dashboard");
    return { ok: true, paidAt: updated.paidAt?.toISOString() ?? null };
  } catch (error) {
    if (error instanceof DomainError) return { ok: false, error: error.message };
    console.error("[setRegistrationPaidAction]", error);
    return { ok: false, error: "Não foi possível salvar. Tente novamente." };
  }
}

export type DeleteResult = { ok: true } | { ok: false; error: string };

export async function deleteRegistrationAction(registrationId: string): Promise<DeleteResult> {
  await requireAdmin();

  if (!z.uuid().safeParse(registrationId).success) return { ok: false, error: "Dados inválidos." };

  try {
    await container.deleteRegistration.execute(registrationId);
    revalidatePath("/dashboard");
    // A vaga liberada muda a landing (pode sair do modo fila de espera).
    revalidatePath("/");
    return { ok: true };
  } catch (error) {
    if (error instanceof DomainError) return { ok: false, error: error.message };
    console.error("[deleteRegistrationAction]", error);
    return { ok: false, error: "Não foi possível excluir. Tente novamente." };
  }
}
