import type { NextApiRequest, NextApiResponse } from "next"

import { KnownError } from "@/lib/errors"

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    // const { title, description } = await req.body()

    // db.insert(notes)
    //   .values({
    //     description: description,
    //     id: crypto.randomUUID(),
    //     title: title,
    //   })
    //   .run()
    // // to apply the changes without reload the page
    // revalidatePath("/")
    console.log(req)
  } catch (error) {
    if (error instanceof KnownError)
      return res.status(500).json({ error: error.message })

    return res
      .status(500)
      .json({ msg: "Something went wrong! That's all we know" })
  }
}
