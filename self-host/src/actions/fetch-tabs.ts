"use server"

import { db } from "@/db"
import type { BrowserTab } from "@/db/schema"
import { browserTabs } from "@/db/schema"

export const getChromeTabs = async (): Promise<Array<BrowserTab>> => {
  const chromeTabs: Array<BrowserTab> = await db
    .select()
    .from(browserTabs)
    .execute()

  return chromeTabs
}
