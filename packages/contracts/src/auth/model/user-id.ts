import { defineId } from "../../common/model/id.js";

export const UserId = defineId("UserId");

export type UserId = ReturnType<typeof UserId.parse>;
