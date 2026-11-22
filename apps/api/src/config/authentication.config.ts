import type { AuthenticationModuleOptions } from "@nestjs/authentication";
import { registerAs } from "@nestjs/config";

export const authenticationConfig = registerAs<AuthenticationModuleOptions>(
  "authentication",
  () => ({
    session: {
      absoluteTtl: "14d",
      idleTtl: "3d",
    },
  }),
);
