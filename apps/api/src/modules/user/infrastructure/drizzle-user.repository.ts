import { Injectable } from "@nestjs/common";
import { InjectDrizzle } from "@nestjs/drizzle";
import { err, ok } from "@repo/shared/result";
import type { Database } from "@repo/database";
import { user } from "@repo/database/schema";
import { UserAlreadyExistsError } from "../domain/errors/user-already-exists.error.js";
import type { User } from "../domain/user.aggregate.js";
import { UserRepository } from "../domain/user.repository.js";

@Injectable()
export class DrizzleUserRepository implements UserRepository {
  constructor(@InjectDrizzle() private readonly db: Database) {}

  async add({ id, email, passwordHash }: User) {
    const [row] = await this.db
      .insert(user)
      .values({ id, email, passwordHash })
      .onConflictDoNothing({ target: user.email })
      .returning();

    return row ? ok() : err(new UserAlreadyExistsError());
  }
}
