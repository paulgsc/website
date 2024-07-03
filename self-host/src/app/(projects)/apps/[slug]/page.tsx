import { redirect } from "next/navigation"
import { MY_APPS } from "routes.constants.mjs"

const Page = ({ params }: { params: { slug: string } }) => {
  if (!MY_APPS.includes(params.slug)) redirect("/404")
  return <></>
}

export default Page
