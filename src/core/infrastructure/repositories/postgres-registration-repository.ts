import type {
  CapacityReservation,
  RegistrationCounts,
  RegistrationQuery,
  RegistrationRepository,
} from "@/core/application/ports/registration-repository";
import { shouldWaitlist, type Registration } from "@/core/domain/entities/registration";
import type { Phone } from "@/core/domain/value-objects/phone";
import { and, count, desc, eq, ilike, or, sql, type SQL } from "drizzle-orm";
import type { Database } from "../database/client";
import { registrations, type RegistrationRow } from "../database/schema";

function toEntity(row: RegistrationRow): Registration {
  return {
    id: row.id,
    eventSlug: row.eventSlug,
    fullName: row.fullName,
    whatsapp: row.whatsapp as Phone,
    emergencyContact: row.emergencyContact,
    imageConsent: true,
    cancellationPolicyAccepted: true,
    waitlisted: row.waitlisted,
    paid: row.paid,
    paidAt: row.paidAt,
    createdAt: row.createdAt,
  };
}

function toRow(registration: Registration) {
  return {
    id: registration.id,
    eventSlug: registration.eventSlug,
    fullName: registration.fullName,
    whatsapp: registration.whatsapp,
    emergencyContact: registration.emergencyContact,
    imageConsent: registration.imageConsent,
    cancellationPolicyAccepted: registration.cancellationPolicyAccepted,
    waitlisted: registration.waitlisted,
    paid: registration.paid,
    paidAt: registration.paidAt,
    createdAt: registration.createdAt,
  };
}

export class PostgresRegistrationRepository implements RegistrationRepository {
  constructor(private readonly db: () => Database) {}

  async saveWithinCapacity(draft: Registration, capacity: number): Promise<CapacityReservation> {
    return this.db().transaction(async (tx) => {
      // Serializa as inscrições do mesmo evento: a contagem abaixo não muda até o commit.
      await tx.execute(sql`select pg_advisory_xact_lock(hashtext(${draft.eventSlug}))`);

      const [{ confirmed }] = await tx
        .select({ confirmed: count() })
        .from(registrations)
        .where(and(eq(registrations.eventSlug, draft.eventSlug), eq(registrations.waitlisted, false)));

      const registration: Registration = { ...draft, waitlisted: shouldWaitlist(confirmed, capacity) };
      await tx.insert(registrations).values(toRow(registration));

      if (!registration.waitlisted) return { registration, waitlistPosition: null };

      const [{ position }] = await tx
        .select({ position: count() })
        .from(registrations)
        .where(and(eq(registrations.eventSlug, draft.eventSlug), eq(registrations.waitlisted, true)));
      return { registration, waitlistPosition: position };
    });
  }

  async update(registration: Registration): Promise<void> {
    await this.db()
      .update(registrations)
      .set({ paid: registration.paid, paidAt: registration.paidAt })
      .where(eq(registrations.id, registration.id));
  }

  async findById(id: string): Promise<Registration | null> {
    if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
    const [row] = await this.db().select().from(registrations).where(eq(registrations.id, id)).limit(1);
    return row ? toEntity(row) : null;
  }

  async list({ eventSlug, status = "all", search }: RegistrationQuery): Promise<Registration[]> {
    const filters: SQL[] = [eq(registrations.eventSlug, eventSlug)];
    if (status === "paid") filters.push(eq(registrations.paid, true));
    if (status === "pending") filters.push(eq(registrations.paid, false), eq(registrations.waitlisted, false));
    if (status === "waitlist") filters.push(eq(registrations.waitlisted, true));

    const term = search?.trim();
    if (term) {
      const like = `%${term.replace(/[%_\\]/g, "\\$&")}%`;
      const digits = term.replace(/\D/g, "");
      const conditions = [
        ilike(registrations.fullName, like),
        ilike(sql`${registrations.id}::text`, `${term.toLowerCase()}%`),
      ];
      if (digits.length >= 3) conditions.push(ilike(registrations.whatsapp, `%${digits}%`));
      filters.push(or(...conditions)!);
    }

    const rows = await this.db()
      .select()
      .from(registrations)
      .where(and(...filters))
      .orderBy(desc(registrations.createdAt));
    return rows.map(toEntity);
  }

  async count(eventSlug: string): Promise<RegistrationCounts> {
    const rows = await this.db()
      .select({ paid: registrations.paid, waitlisted: registrations.waitlisted, total: count() })
      .from(registrations)
      .where(eq(registrations.eventSlug, eventSlug))
      .groupBy(registrations.paid, registrations.waitlisted);

    const sum = (predicate: (r: (typeof rows)[number]) => boolean) =>
      rows.filter(predicate).reduce((acc, r) => acc + r.total, 0);

    const waitlisted = sum((r) => r.waitlisted);
    const paid = sum((r) => r.paid);
    const pending = sum((r) => !r.paid && !r.waitlisted);
    return { total: sum(() => true), confirmed: sum((r) => !r.waitlisted), paid, pending, waitlisted };
  }
}
