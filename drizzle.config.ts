import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/core/infrastructure/database/schema.ts",
  out: "./drizzle",
  // Migrations usam conexão direta (sem pooler) quando disponível — ex.: Neon na Vercel.
  dbCredentials: { url: (process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL)! },
});
