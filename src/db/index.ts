import "server-only";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

const dbUrl = process.env.DATABASE_URL!;

const client = postgres(dbUrl, { ssl: "require" });

export const db = drizzle(client, { schema });
