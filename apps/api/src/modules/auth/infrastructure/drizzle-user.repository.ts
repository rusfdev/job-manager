import { Injectable } from "@nestjs/common";
import { InjectDrizzle } from "@nestjs/drizzle";
import { eq } from "drizzle-orm";
import type { Email, UserId } from "@repo/shared/domain";
import { err, ok, type Result } from "@repo/shared/result";
import type { Database } from "@repo/database";
import { user } from "@repo/database/schema";
import { EmailAlreadyExistsError } from "../domain/errors/email-already-exists.error.js";
import { User } from "../domain/user.aggregate.js";
import { UserRepository } from "../domain/user.repository.js";

@Injectable()
export class DrizzleUserRepository implements UserRepository {
  constructor(@InjectDrizzle() private readonly db: Database) {}

  async add({ id, email, passwordHash }: User): Promise<Result<void, EmailAlreadyExistsError>> {
    const [row] = await this.db
      .insert(user)
      .values({ id, email, passwordHash })
      .onConflictDoNothing({ target: user.email })
      .returning({ id: user.id });

    return row ? ok() : err(new EmailAlreadyExistsError());
  }

  async findByEmail(email: Email): Promise<User | undefined> {
    const [row] = await this.db
      .select({ id: user.id, email: user.email, passwordHash: user.passwordHash })
      .from(user)
      .where(eq(user.email, email));

    if (!row) return;

    return User.restore({
      id: row.id as UserId,
      email: row.email as Email,
      passwordHash: row.passwordHash,
    });
  }

  async save({ id, email, passwordHash }: User): Promise<void> {
    await this.db.update(user).set({ email, passwordHash }).where(eq(user.id, id));
  }
}
