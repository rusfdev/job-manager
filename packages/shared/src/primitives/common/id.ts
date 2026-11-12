import { z } from "zod";

export const idSchema = z.uuid().brand("Id").meta({ id: "Id" });

export type Id = z.infer<typeof idSchema>;

export const createBrandIdSchema = <T extends string>(name: T) => idSchema.brand(name);
