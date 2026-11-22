import {
  AuthenticationRegistry,
  SessionCookieProvider,
  type SessionRecord,
} from "@nestjs/authentication";
import { Injectable } from "@nestjs/common";
import type { Principal } from "@repo/auth-common/contracts";

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
