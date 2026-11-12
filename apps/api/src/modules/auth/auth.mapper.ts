import type { Email, UserId } from "@repo/shared/primitives";
import type { user } from "@repo/database/schema";
import type { UserDto } from "@repo/contracts";

export function toUser(row: Pick<typeof user.$inferSelect, "id" | "email">): UserDto {
  return { id: row.id as UserId, email: row.email as Email };
}
