import type { Principal } from "@repo/auth-common/contracts";

declare module "@nestjs/authentication" {
  interface AuthenticationTypes {
    user: Principal;
    sessionExtra: {
      user: Principal;
    };
  }
}
