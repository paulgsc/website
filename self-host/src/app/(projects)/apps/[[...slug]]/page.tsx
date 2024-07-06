import { redirect } from "next/navigation"

import type { ProjectsLayoutType } from "@/types/layout"
import { ValidatedProjectsSchema } from "@/types/layout"
import ProjectsLayout from "@/components/layout-components/projects-layout"

const Page = ({ params }: { params: { slug: Array<string> } }) => {
  const slugsString = params.slug.join("/")

  if (ValidatedProjectsSchema.safeParse(slugsString).error) redirect("/404")
  const layout: ProjectsLayoutType = ValidatedProjectsSchema.parse(slugsString)

  return <ProjectsLayout layout={layout} />
}

export default Page
