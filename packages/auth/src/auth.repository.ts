import { Injectable } from "@nestjs/common";
import type { User, UserId } from "@repo/contracts/user";
import { eq, InjectDatabase, type Database } from "@repo/database";
import { user } from "@repo/database/schema";
import { toUser } from "./auth.mapper.js";

export interface AuthCredentials {
  user: User;
  passwordHash: string;
}

@Injectable()
export class AuthRepository {
  constructor(
    @InjectDatabase()
    private readonly db: Database,
  ) {}

  async create(email: string, passwordHash: string): Promise<User | undefined> {
    const [row] = await this.db
      .insert(user)
      .values({ email, passwordHash })
      .onConflictDoNothing({ target: user.email })
      .returning({ id: user.id, email: user.email });

    return row && toUser(row);
  }

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
