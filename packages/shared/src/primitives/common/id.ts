import { z } from "zod";

export const createIdSchema = <T extends string>(name: T) =>
  z.uuid().meta({ id: name }).brand(name);
