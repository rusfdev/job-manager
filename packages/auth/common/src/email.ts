import { z } from "zod";

export const Email = z.email().brand("Email").meta({ id: "Email" });

export type Email = z.infer<typeof Email>;
