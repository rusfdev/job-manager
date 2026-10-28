import { drizzle } from "drizzle-orm/node-postgres";
import { relations } from "./relations.js";
import type { DatabaseConfig } from "./database.config.js";

export const createDatabase = (config: DatabaseConfig) =>
  drizzle({
    connection: config.url,
    relations,
  });

export type Database = ReturnType<typeof createDatabase>;
