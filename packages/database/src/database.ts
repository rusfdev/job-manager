import { type NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { type Relations, relations } from "./relations.js";

export type Database = NodePgDatabase<Relations>;

export type DatabaseConfig = {
  connection: string;
};

export const createDatabase = (config: DatabaseConfig): Database =>
  drizzle({
    connection: config.connection,
    relations,
  });
