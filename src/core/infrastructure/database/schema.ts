import { boolean, index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const registrations = pgTable(
  "registrations",
  {
    id: uuid("id").primaryKey(),
    eventSlug: text("event_slug").notNull(),
    fullName: text("full_name").notNull(),
    whatsapp: text("whatsapp").notNull(),
    emergencyContact: text("emergency_contact").notNull(),
    imageConsent: boolean("image_consent").notNull(),
    cancellationPolicyAccepted: boolean("cancellation_policy_accepted").notNull(),
    /** Inscrição feita depois de esgotar as vagas: aguarda na fila de espera. */
    waitlisted: boolean("waitlisted").notNull().default(false),
    paid: boolean("paid").notNull().default(false),
    paidAt: timestamp("paid_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("registrations_event_created_idx").on(table.eventSlug, table.createdAt),
    index("registrations_event_paid_idx").on(table.eventSlug, table.paid),
  ],
);

export type RegistrationRow = typeof registrations.$inferSelect;
