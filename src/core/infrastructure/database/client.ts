import "server-only";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { requireEnv } from "../config/env";
import * as schema from "./schema";

export type Database = NodePgDatabase<typeof schema>;

// Reaproveita o pool entre recargas do `next dev` para não esgotar conexões.
const globalForDb = globalThis as unknown as { numaDb?: Database };

/** Conecta sob demanda: o site funciona sem banco até alguém usar inscrição/painel. */
export function getDb(): Database {
  if (!globalForDb.numaDb) {
    const pool = new Pool({ connectionString: requireEnv("DATABASE_URL"), max: 5 });
    globalForDb.numaDb = drizzle(pool, { schema });
  }
  return globalForDb.numaDb;
}
