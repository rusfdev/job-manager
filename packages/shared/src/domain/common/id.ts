import { z } from "zod";

export const Id = z.uuid().brand("Id").meta({ id: "Id" });

export type Id = z.infer<typeof Id>;

export const defineId = <T extends string>(name: T) => Id.brand(name);
