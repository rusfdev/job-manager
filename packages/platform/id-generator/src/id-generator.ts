import { randomUUIDv7 } from "node:crypto";
import { Injectable } from "@nestjs/common";
import type { Id } from "@repo/common/domain";

@Injectable()
export class IdGenerator {
  generate<T extends Id>(): T {
    return randomUUIDv7() as T;
  }
}
