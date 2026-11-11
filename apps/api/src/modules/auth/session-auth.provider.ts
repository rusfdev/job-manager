import {
  AuthenticationRegistry,
  SessionCookieProvider,
  type SessionRecord,
} from "@nestjs/authentication";
import { Injectable } from "@nestjs/common";
import type { UserDto } from "@repo/contracts";

declare module "@nestjs/authentication" {
  interface AuthenticationTypes {
    user: UserDto;
    sessionExtra: { user: UserDto };
  }
}

@Injectable()
export class SessionAuth extends SessionCookieProvider<UserDto> {
  constructor(registry: AuthenticationRegistry) {
    super();
    registry.registerProvider(this);
  }

  protected validate(session: SessionRecord): UserDto | null {
    return session.extra?.user ?? null;
  }
}
