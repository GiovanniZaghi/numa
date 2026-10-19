import type { Money } from "@/core/domain/value-objects/money";

const TIME_ZONE = "America/Sao_Paulo";

export function formatMoney({ amountInCents, currency }: Money): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency }).format(
    amountInCents / 100,
  );
}

export function formatDayMonth(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    timeZone: TIME_ZONE,
  }).format(date);
}

export function formatWeekday(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", { weekday: "long", timeZone: TIME_ZONE }).format(date);
}

export function formatHour(date: Date): string {
  const hour = new Intl.DateTimeFormat("pt-BR", {
    hour: "numeric",
    timeZone: TIME_ZONE,
  }).format(date);
  return `${Number(hour)}h`;
}

/** "18/10/2026 22:05" */
export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: TIME_ZONE,
  }).format(date);
}

/** "31.10" */
export function formatShortDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    timeZone: TIME_ZONE,
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("day")}.${get("month")}`;
}
