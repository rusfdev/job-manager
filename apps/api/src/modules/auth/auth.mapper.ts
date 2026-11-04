import type { user } from "@repo/database/schema";
import type { User, UserId } from "@repo/contracts/user";

export function toUser(row: Pick<typeof user.$inferSelect, "id" | "email">): User {
  return { id: row.id as UserId, email: row.email };
}
