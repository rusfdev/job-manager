import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import type { Relations } from "./relations.js";

export type Database = NodePgDatabase<Relations>;
