import type { UserDto } from "@repo/shared/contracts";
import type { Email, UserId } from "@repo/shared/primitives";
import type { user } from "@repo/database/schema";

export function toUser(row: Pick<typeof user.$inferSelect, "id" | "email">): UserDto {
  return { id: row.id as UserId, email: row.email as Email };
}
