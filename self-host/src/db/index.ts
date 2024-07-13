import Database from "better-sqlite3"
import type { BetterSQLite3Database } from "drizzle-orm/better-sqlite3"
import { drizzle } from "drizzle-orm/better-sqlite3"

import * as schema from "./schema"

const sqlite = new Database(process.env.DB_URL!)
export const db: BetterSQLite3Database<typeof schema> = drizzle(sqlite, {
  // to use query builders like findMany()
  schema,
})
