"use server";

import { registerAttendeeSchema } from "@/core/application/dtos/register-attendee.dto";
import { container } from "@/core/container";
import { registrationProtocol } from "@/core/domain/entities/registration";
import { DomainError } from "@/core/domain/errors";
import { revalidatePath } from "next/cache";

export type RegistrationField =
  | "fullName"
  | "whatsapp"
  | "emergencyContact"
  | "imageConsent"
  | "cancellationPolicyAccepted";

export type RegistrationActionState =
  | { status: "idle" }
  | {
      status: "error";
      message: string;
      fieldErrors: Partial<Record<RegistrationField, string>>;
      values: Partial<Record<RegistrationField, string>>;
    }
  | {
      status: "success";
      protocol: string;
      confirmationUrl: string;
      waitlisted: boolean;
      waitlistPosition: number | null;
    };

export async function registerAttendeeAction(
  _prev: RegistrationActionState,
  formData: FormData,
): Promise<RegistrationActionState> {
  const raw = Object.fromEntries(formData) as Record<string, string>;
  const values = {
    fullName: raw.fullName,
    whatsapp: raw.whatsapp,
    emergencyContact: raw.emergencyContact,
    imageConsent: raw.imageConsent,
    cancellationPolicyAccepted: raw.cancellationPolicyAccepted,
  };

  const parsed = registerAttendeeSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<RegistrationField, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as RegistrationField;
      fieldErrors[field] ??= issue.message;
    }
    return { status: "error", message: "Confira os campos destacados.", fieldErrors, values };
  }

  try {
    const result = await container.registerAttendee.execute(parsed.data);
    // Atualiza a landing (vagas restantes / modo fila de espera).
    revalidatePath("/");
    return {
      status: "success",
      protocol: registrationProtocol({ id: result.registrationId }),
      confirmationUrl: result.confirmationUrl,
      waitlisted: result.waitlisted,
      waitlistPosition: result.waitlistPosition,
    };
  } catch (error) {
    if (error instanceof DomainError) {
      const fieldErrors = error.field ? { [error.field]: error.message } : {};
      return { status: "error", message: error.message, fieldErrors, values };
    }
    console.error("[registerAttendeeAction]", error);
    return {
      status: "error",
      message: "Não foi possível concluir agora. Tente novamente em instantes.",
      fieldErrors: {},
      values,
    };
  }
}
