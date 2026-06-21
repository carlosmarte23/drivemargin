import "server-only";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

const dbUrl = process.env.DATABASE_URL!;

const globalForDb = globalThis as unknown as {
  postgresClient?: ReturnType<typeof postgres>;
};

const maxConnections = Number(
  process.env.DATABASE_POOL_MAX ??
    (process.env.NODE_ENV === "production" ? 5 : 1),
);

const client =
  globalForDb.postgresClient ??
  postgres(dbUrl, { ssl: "require", max: maxConnections });

if (process.env.NODE_ENV !== "production") {
  globalForDb.postgresClient = client;
}

export const db = drizzle(client, { schema });
