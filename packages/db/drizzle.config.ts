import { defineConfig } from "drizzle-kit";

// drizzle-kit loads .env from the working directory (packages/db under turbo).
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema/index.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
