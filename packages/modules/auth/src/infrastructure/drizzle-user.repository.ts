import { Injectable } from "@nestjs/common";
import { InjectDrizzle } from "@nestjs/drizzle";
import { eq } from "drizzle-orm";
import { UniqueConstraintError } from "@repo/common/errors";
import type { Email } from "@repo/contracts";
import type { UserId } from "@repo/contracts/auth";
import type { Database } from "@repo/database";
import { users } from "@repo/database/schema";
import { isUniqueViolation } from "@repo/database/utils";
import { User } from "../domain/user.aggregate.js";
import { UserRepository } from "../domain/user.repository.js";

@Injectable()
export class DrizzleUserRepository implements UserRepository {
  constructor(@InjectDrizzle() private readonly db: Database) {}

  async existsByEmail(email: Email): Promise<boolean> {
    const [row] = await this.db.select({ id: users.id }).from(users).where(eq(users.email, email));
    return row !== undefined;
  }

  async findByEmail(email: Email): Promise<User | null> {
    const [row] = await this.db.select().from(users).where(eq(users.email, email));

    if (!row) return null;

    return User.restore({
      id: row.id as UserId,
      email: row.email as Email,
      passwordHash: row.passwordHash,
    });
  }

  async save({ id, email, passwordHash }: User): Promise<void> {
    try {
      await this.db
        .insert(users)
        .values({ id, email, passwordHash })
        .onConflictDoUpdate({ target: users.id, set: { email, passwordHash } });
    } catch (e) {
      if (isUniqueViolation(e)) {
        throw new UniqueConstraintError({ cause: e });
      }
      throw e;
    }
  }
}
