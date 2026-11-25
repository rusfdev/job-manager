import type { Principal } from "@repo/contracts/auth";

declare module "@nestjs/authentication" {
  interface AuthenticationTypes {
    user: Principal;
    sessionExtra: {
      user: Principal;
    };
  }
}
