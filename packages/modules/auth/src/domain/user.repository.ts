import type { Email } from "@repo/contracts";
import { type User } from "./user.aggregate.js";

export abstract class UserRepository {
  abstract existsByEmail(email: Email): Promise<boolean>;
  abstract findByEmail(email: Email): Promise<User | null>;
  abstract save(user: User): Promise<void>;
}
