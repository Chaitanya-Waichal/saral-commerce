import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const usersData = sqliteTable("usersData", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull(),
  email: text("email").notNull().unique(),
  hashedPassword: text("hashed_password").notNull(),
});
