import type { UserDto } from "@repo/contracts";
import type { user } from "@repo/database/schema";
import type { Email, UserId } from "@repo/primitives";

export function toUser(row: Pick<typeof user.$inferSelect, "id" | "email">): UserDto {
  return { id: row.id as UserId, email: row.email as Email };
}
