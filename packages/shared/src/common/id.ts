import { z } from "zod";

export const createIdSchema = <TName extends string>(name: TName) => {
  return z.uuid().meta({ id: name }).brand(name);
};
