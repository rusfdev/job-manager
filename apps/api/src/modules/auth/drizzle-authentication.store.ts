import { Injectable } from "@nestjs/common";
import {
  AuthenticationStorage,
  type SessionRecord,
  type SessionStore,
} from "@nestjs/authentication";
import { InjectDrizzle } from "@nestjs/drizzle";
import type { Database } from "@repo/database";
import { session, user } from "@repo/database/schema";
import { and, eq, lt } from "drizzle-orm";
import { toUser } from "./auth.mapper.js";

@Injectable()
export class DrizzleAuthenticationStore implements SessionStore {
  constructor(
    @InjectDrizzle() private readonly db: Database,
    storage: AuthenticationStorage,
  ) {
    storage.registerSource({ sessions: this });
  }

  async getSession(id: string): Promise<SessionRecord | undefined> {
    const [row] = await this.db
      .select({ session, user: { id: user.id, email: user.email } })
      .from(session)
      .innerJoin(user, eq(user.id, session.userId))
      .where(eq(session.id, id));

    return row && { ...row.session, extra: { user: toUser(row.user) } };
  }

  async createSession(record: SessionRecord): Promise<void> {
    await this.db.delete(session).where(lt(session.expiresAt, record.createdAt));
    await this.db.insert(session).values({
      id: record.id,
      userId: record.userId,
      createdAt: record.createdAt,
      expiresAt: record.expiresAt,
      lastActiveAt: record.lastActiveAt,
    });
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

  listUserSessions(userId: string): Promise<SessionRecord[]> {
    return this.db.select().from(session).where(eq(session.userId, userId));
  }

  async deleteUserSessions(userId: string): Promise<void> {
    await this.db.delete(session).where(eq(session.userId, userId));
  }
}
