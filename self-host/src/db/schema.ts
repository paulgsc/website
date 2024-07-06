import { sqliteTable, text } from "drizzle-orm/sqlite-core"

export const notes = sqliteTable("notes", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
})

export type Note = typeof notes.$inferSelect
