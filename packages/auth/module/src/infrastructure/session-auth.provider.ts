import { Injectable } from "@nestjs/common";
import {
  AuthenticationRegistry,
  SessionCookieProvider,
  type SessionRecord,
} from "@nestjs/authentication";
import type { Principal } from "@repo/auth-common";

@Injectable()
export class SessionAuth extends SessionCookieProvider<Principal> {
  constructor(registry: AuthenticationRegistry) {
    super();
    registry.registerProvider(this);
  }

  protected validate(session: SessionRecord): Principal | undefined {
    return session.extra?.user;
  }
}
