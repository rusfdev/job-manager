import { z } from "zod";

export const apiErrorSchema = z
  .object({
    statusCode: z.number().int(),
    errorCode: z.string().optional(),
    message: z.string(),
  })
  .meta({ id: "ApiErrorDto" });

export type ApiErrorDto = z.infer<typeof apiErrorSchema>;
