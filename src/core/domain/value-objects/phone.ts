import { DomainError } from "../errors";

/** Telefone brasileiro normalizado: apenas dígitos, DDD + número (10 ou 11 dígitos). */
export type Phone = string & { readonly __brand: "Phone" };

export function createPhone(raw: string, field = "phone"): Phone {
  const digits = raw.replace(/\D/g, "").replace(/^55(?=\d{10,11}$)/, "");
  if (!/^[1-9]{2}9?\d{8}$/.test(digits)) {
    throw new DomainError("Informe um telefone válido com DDD.", field);
  }
  return digits as Phone;
}

export function formatPhone(phone: Phone): string {
  const ddd = phone.slice(0, 2);
  const rest = phone.slice(2);
  const split = rest.length === 9 ? 5 : 4;
  return `(${ddd}) ${rest.slice(0, split)}-${rest.slice(split)}`;
}
