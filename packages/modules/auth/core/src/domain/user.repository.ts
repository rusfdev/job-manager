import type { Result } from "@repo/common/result";
import type { Email } from "@repo/auth-common/domain";
import type { EmailAlreadyExistsError } from "./errors/email-already-exists.error.js";
import { type User } from "./user.aggregate.js";

export abstract class UserRepository {
  abstract add(user: User): Promise<Result<void, EmailAlreadyExistsError>>;
  abstract findByEmail(email: Email): Promise<User | undefined>;
  abstract save(user: User): Promise<void>;
}
