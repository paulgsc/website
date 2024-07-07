import type { NextApiRequest, NextApiResponse } from "next"
import { revalidatePath } from "next/cache"
import { db } from "@/db"
import type { BrowserTab } from "@/db/schema"
import { browserTabs } from "@/db/schema"

import type { Tab } from "@/types/api/chrome"
import { TabSchema } from "@/types/api/chrome"
import { KnownError } from "@/lib/errors"

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const reqBody = await req.body
    const parsedReqBody = TabSchema.safeParse(reqBody)

    if (!parsedReqBody.success)
      throw new KnownError(parsedReqBody.error.message)

    const chromeTabs: Tab = parsedReqBody.data satisfies BrowserTab

    db.insert(browserTabs)
      .values({ ...chromeTabs })
      .run()

    // to apply the changes without reload the page
    revalidatePath("/")
  } catch (error) {
    if (error instanceof KnownError)
      return res.status(500).json({ error: error.message })

    return res
      .status(500)
      .json({ msg: "Something went wrong! That's all we know" })
  }
}
