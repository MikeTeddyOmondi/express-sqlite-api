import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const tasks = sqliteTable("tasks", {
  id: integer("id").notNull().primaryKey().unique(),
  public_id: text("public_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  completed: integer("completed", { mode: "boolean" }).notNull().default(false),
});
