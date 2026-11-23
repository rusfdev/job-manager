import { z } from "zod";

export const Id = z.uuid().brand("Id");

export type Id = z.infer<typeof Id>;

export const defineId = <T extends string>(name: T) => Id.meta({ id: name }).brand(name);
