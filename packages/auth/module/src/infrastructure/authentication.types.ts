import type { Principal } from "@repo/auth-common";

declare module "@nestjs/authentication" {
  interface AuthenticationTypes {
    user: Principal;
    sessionExtra: {
      user: Principal;
    };
  }
}
