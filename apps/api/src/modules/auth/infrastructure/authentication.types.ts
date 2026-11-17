import type { Principal } from "@repo/shared/auth";

declare module "@nestjs/authentication" {
  interface AuthenticationTypes {
    user: Principal;
    sessionExtra: {
      user: Principal;
    };
  }
}
