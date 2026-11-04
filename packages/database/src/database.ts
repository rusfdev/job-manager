import { drizzle } from "drizzle-orm/node-postgres";
import { relations } from "./relations.js";

export type DatabaseConfig = {
  url: string;
};

export const createDatabase = (config: DatabaseConfig) =>
  drizzle({
    connection: config.url,
    relations,
  });

export type Database = ReturnType<typeof createDatabase>;
