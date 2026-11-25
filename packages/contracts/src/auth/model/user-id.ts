import { z } from "zod";

export const UserId = z.uuid().brand("UserId").meta({ id: "UserId" });

export type UserId = ReturnType<typeof UserId.parse>;
