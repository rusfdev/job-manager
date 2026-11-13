import type { Result } from "@repo/shared/result";
import type { UserAlreadyExistsError } from "./errors/user-already-exists.error.js";
import { type User } from "./user.aggregate.js";

export abstract class UserRepository {
  abstract add(user: User): Promise<Result<void, UserAlreadyExistsError>>;
}
