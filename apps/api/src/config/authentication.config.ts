import { registerAs } from "@nestjs/config";
import type { AuthenticationModuleOptions } from "@nestjs/authentication";

export const authenticationConfig = registerAs<AuthenticationModuleOptions>(
  "authentication",
  () => ({
    session: {
      absoluteTtl: "14d",
      idleTtl: "3d",
    },
  }),
);
