import { Injectable } from "@nestjs/common";
import { InjectDrizzle } from "@nestjs/drizzle";
import { eq } from "drizzle-orm";
import type { UserDto } from "@repo/shared/contracts";
import type { UserId } from "@repo/shared/primitives";
import type { Database } from "@repo/database";
import { user } from "@repo/database/schema";
import { toUser } from "./auth.mapper.js";

export interface AuthCredentials {
  user: UserDto;
  passwordHash: string;
}

@Injectable()
export class AuthRepository {
  constructor(
    @InjectDrizzle()
    private readonly db: Database,
  ) {}

  async findCredentials(email: string): Promise<AuthCredentials | undefined> {
    const [row] = await this.db
      .select({ id: user.id, email: user.email, passwordHash: user.passwordHash })
      .from(user)
      .where(eq(user.email, email));

    return row && { user: toUser(row), passwordHash: row.passwordHash };
  }

  async updatePasswordHash(id: UserId, passwordHash: string): Promise<void> {
    await this.db.update(user).set({ passwordHash }).where(eq(user.id, id));
  }
}
