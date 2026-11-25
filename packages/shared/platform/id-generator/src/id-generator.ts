import { randomUUIDv7 } from "node:crypto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class IdGenerator {
  generate<T extends string>(): T {
    return randomUUIDv7() as T;
  }
}
