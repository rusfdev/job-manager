import { describe, expect, it } from "vitest";
import { Id } from "@repo/common/domain";
import { IdGenerator } from "./id-generator.js";

describe("IdGenerator", () => {
  const id = new IdGenerator();

  it("generates an id that passes the schema", () => {
    expect(Id.safeParse(id.generate()).success).toBe(true);
  });
});
