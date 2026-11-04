import { Injectable } from "@nestjs/common";
import {
  AuthenticationRegistry,
  SessionCookieProvider,
  type SessionRecord,
} from "@nestjs/authentication";
import type { User } from "@repo/contracts/user";

declare module "@nestjs/authentication" {
  interface AuthenticationTypes {
    user: User;
    sessionExtra: { user: User };
  }
}

@Injectable()
export class SessionAuth extends SessionCookieProvider<User> {
  constructor(registry: AuthenticationRegistry) {
    super();
    registry.registerProvider(this);
  }

  protected validate(session: SessionRecord): User | null {
    return session.extra?.user ?? null;
  }
}
