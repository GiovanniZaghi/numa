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

/** "15h" ou "10h30". */
export function formatHour(date: Date): string {
  const parts = new Intl.DateTimeFormat("pt-BR", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: TIME_ZONE,
  }).formatToParts(date);
  const hour = Number(parts.find((p) => p.type === "hour")?.value);
  const minute = parts.find((p) => p.type === "minute")?.value ?? "00";
  return minute === "00" ? `${hour}h` : `${hour}h${minute}`;
}

/** "10h30" ou "15h — 19h" quando há término. */
export function formatTimeRange(startsAt: Date, endsAt: Date | null): string {
  return endsAt ? `${formatHour(startsAt)} — ${formatHour(endsAt)}` : formatHour(startsAt);
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
