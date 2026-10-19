export type Currency = "BRL";

export interface Money {
  readonly amountInCents: number;
  readonly currency: Currency;
}

export function money(amountInCents: number, currency: Currency = "BRL"): Money {
  if (!Number.isInteger(amountInCents) || amountInCents < 0) {
    throw new RangeError("O valor deve ser um inteiro não negativo em centavos.");
  }
  return { amountInCents, currency };
}
