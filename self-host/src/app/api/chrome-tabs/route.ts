import { NextResponse } from "next/server"
import { db } from "@/db"
import type { BrowserTab } from "@/db/schema"
import { browserTabs } from "@/db/schema"

import type { Tab } from "@/types/api/chrome"
import { TabSchema } from "@/types/api/chrome"
import { KnownError } from "@/lib/errors"

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const reqBody = await req.json()

    const parsedReqBody = TabSchema.safeParse(reqBody)

    if (!parsedReqBody.success)
      throw new KnownError(parsedReqBody.error.message)

    const chromeTabs: Tab = parsedReqBody.data satisfies BrowserTab

    db.insert(browserTabs)
      .values({ ...chromeTabs })
      .run()

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (error) {
    if (error instanceof KnownError)
      return NextResponse.json(
        { message: error.message, ok: false },
        { status: 500 }
      )
    return NextResponse.json(
      { message: "Something went wrong! That's all we know!", ok: false },
      { status: 500 }
    )
  }
}
