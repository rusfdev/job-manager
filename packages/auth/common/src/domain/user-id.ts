import { defineId } from "@repo/common/domain";

export const UserId = defineId("UserId");

export type UserId = ReturnType<typeof UserId.parse>;
