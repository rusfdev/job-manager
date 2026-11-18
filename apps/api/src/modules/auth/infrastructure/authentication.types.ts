import type { Principal } from "@repo/shared/contracts";

declare module "@nestjs/authentication" {
  interface AuthenticationTypes {
    user: Principal;
    sessionExtra: {
      user: Principal;
    };
  }
}
