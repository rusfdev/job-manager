import { Injectable } from "@nestjs/common";
import { InjectDrizzle } from "@nestjs/drizzle";
import { eq } from "drizzle-orm";
import type { Email, UserId } from "@repo/shared/domain";
import { err, ok, type Result } from "@repo/shared/result";
import type { Database } from "@repo/database";
import { users } from "@repo/database/schema";
import { EmailAlreadyExistsError } from "../domain/errors/email-already-exists.error.js";
import { User } from "../domain/user.aggregate.js";
import { UserRepository } from "../domain/user.repository.js";

@Injectable()
export class DrizzleUserRepository implements UserRepository {
  constructor(@InjectDrizzle() private readonly db: Database) {}

  async add({ id, email, passwordHash }: User): Promise<Result<void, EmailAlreadyExistsError>> {
    const [row] = await this.db
      .insert(users)
      .values({ id, email, passwordHash })
      .onConflictDoNothing({ target: users.email })
      .returning({ id: users.id });

    return row ? ok() : err(new EmailAlreadyExistsError());
  }

  async findByEmail(email: Email): Promise<User | undefined> {
    const [row] = await this.db
      .select({ id: users.id, email: users.email, passwordHash: users.passwordHash })
      .from(users)
      .where(eq(users.email, email));

    if (!row) return;

    return User.restore({
      id: row.id as UserId,
      email: row.email as Email,
      passwordHash: row.passwordHash,
    });
  }

  async save({ id, email, passwordHash }: User): Promise<void> {
    await this.db.update(users).set({ email, passwordHash }).where(eq(users.id, id));
  }
}
