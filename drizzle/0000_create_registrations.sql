CREATE TABLE "registrations" (
	"id" uuid PRIMARY KEY NOT NULL,
	"event_slug" text NOT NULL,
	"full_name" text NOT NULL,
	"whatsapp" text NOT NULL,
	"emergency_contact" text NOT NULL,
	"image_consent" boolean NOT NULL,
	"cancellation_policy_accepted" boolean NOT NULL,
	"paid" boolean DEFAULT false NOT NULL,
	"paid_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "registrations_event_created_idx" ON "registrations" USING btree ("event_slug","created_at");--> statement-breakpoint
CREATE INDEX "registrations_event_paid_idx" ON "registrations" USING btree ("event_slug","paid");