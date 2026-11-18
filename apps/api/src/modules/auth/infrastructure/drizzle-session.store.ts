import {
  AuthenticationStorage,
  type SessionRecord,
  type SessionStore,
} from "@nestjs/authentication";
import { Injectable } from "@nestjs/common";
import { InjectDrizzle } from "@nestjs/drizzle";
import { and, eq, lt } from "drizzle-orm";
import type { UserId } from "@repo/shared/domain";
import type { Database } from "@repo/database";
import { session } from "@repo/database/schema";

@Injectable()
export class DrizzleSessionStore implements SessionStore {
  constructor(
    @InjectDrizzle() private readonly db: Database,
    storage: AuthenticationStorage,
  ) {
    storage.registerSource({ sessions: this });
  }

  async getSession(id: string): Promise<SessionRecord | undefined> {
    const [row] = await this.db.select().from(session).where(eq(session.id, id));
    if (!row) return;

    return { ...row, extra: { user: { id: row.userId as UserId } } };
  }

  async createSession(record: SessionRecord): Promise<void> {
    await this.db.insert(session).values(record);
    await this.db.delete(session).where(lt(session.expiresAt, record.createdAt));
  }

  async touchSession(id: string, lastActiveAt: Date): Promise<void> {
    await this.db
      .update(session)
      .set({ lastActiveAt })
      .where(and(eq(session.id, id), lt(session.lastActiveAt, lastActiveAt)));
  }

  async deleteSession(id: string): Promise<boolean> {
    const deleted = await this.db
      .delete(session)
      .where(eq(session.id, id))
      .returning({ id: session.id });

    return deleted.length > 0;
  }

  listUserSessions(userId: UserId): Promise<SessionRecord[]> {
    return this.db.select().from(session).where(eq(session.userId, userId));
  }

  async deleteUserSessions(userId: UserId): Promise<void> {
    await this.db.delete(session).where(eq(session.userId, userId));
  }
}
