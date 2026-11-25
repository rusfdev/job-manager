import { Injectable } from "@nestjs/common";
import {
  AuthenticationStorage,
  type SessionRecord,
  type SessionStore,
} from "@nestjs/authentication";
import { InjectDrizzle } from "@nestjs/drizzle";
import { and, eq, lt } from "drizzle-orm";
import type { Database } from "@repo/database";
import { sessions } from "@repo/database/schema";
import type { UserId } from "@repo/contracts/auth";

@Injectable()
export class DrizzleSessionStore implements SessionStore {
  constructor(
    @InjectDrizzle() private readonly db: Database,
    storage: AuthenticationStorage,
  ) {
    storage.registerSource({ sessions: this });
  }

  async getSession(id: string): Promise<SessionRecord | undefined> {
    const [row] = await this.db.select().from(sessions).where(eq(sessions.id, id));
    if (!row) return;

    return { ...row, extra: { user: { id: row.userId as UserId } } };
  }

  async createSession(record: SessionRecord): Promise<void> {
    await this.db.insert(sessions).values(record);
    await this.db.delete(sessions).where(lt(sessions.expiresAt, record.createdAt));
  }

  async touchSession(id: string, lastActiveAt: Date): Promise<void> {
    await this.db
      .update(sessions)
      .set({ lastActiveAt })
      .where(and(eq(sessions.id, id), lt(sessions.lastActiveAt, lastActiveAt)));
  }

  async deleteSession(id: string): Promise<boolean> {
    const deleted = await this.db
      .delete(sessions)
      .where(eq(sessions.id, id))
      .returning({ id: sessions.id });

    return deleted.length > 0;
  }

  listUserSessions(userId: UserId): Promise<SessionRecord[]> {
    return this.db.select().from(sessions).where(eq(sessions.userId, userId));
  }

  async deleteUserSessions(userId: UserId): Promise<void> {
    await this.db.delete(sessions).where(eq(sessions.userId, userId));
  }
}
