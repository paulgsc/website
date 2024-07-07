import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const browserTabs = sqliteTable("browser_tabs", {
  id: integer("id").primaryKey(),
  status: text("status", { enum: ["loading", "complete"] }),
  index: integer("index").notNull(),
  openerTabId: integer("opener_tab_id"),
  title: text("title"),
  url: text("url"),
  pendingUrl: text("pending_url"),
  pinned: integer("pinned", { mode: "boolean" }).notNull(),
  highlighted: integer("highlighted", { mode: "boolean" }).notNull(),
  windowId: integer("window_id").notNull(),
  active: integer("active", { mode: "boolean" }).notNull(),
  favIconUrl: text("fav_icon_url"),
  incognito: integer("incognito", { mode: "boolean" }).notNull(),
  selected: integer("selected", { mode: "boolean" }).notNull(),
  audible: integer("audible", { mode: "boolean" }),
  discarded: integer("discarded", { mode: "boolean" }).notNull(),
  autoDiscardable: integer("auto_discardable", { mode: "boolean" }).notNull(),
  width: integer("width"),
  height: integer("height"),
  sessionId: text("session_id"),
  groupId: integer("group_id").notNull(),
  lastAccessed: integer("last_accessed"),
})

export type BrowserTab = typeof browserTabs.$inferSelect
