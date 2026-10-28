import { z } from "zod";

export const userIdSchema = z.uuid().brand("UserId").meta({ id: "UserId" });

export type UserId = z.infer<typeof userIdSchema>;
