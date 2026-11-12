import { describe, expect, it } from "vitest";
import { idSchema } from "@repo/shared/primitives";
import { IdGenerator } from "./id-generator.js";

describe("IdGenerator", () => {
  const gen = new IdGenerator();

  it("generates an id that passes the schema", () => {
    expect(idSchema.safeParse(gen.generate()).success).toBe(true);
  });
});
