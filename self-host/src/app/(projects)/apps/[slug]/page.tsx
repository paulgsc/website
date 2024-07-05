import { redirect } from "next/navigation"
import { MY_APPS } from "routes.constants.mjs"

import type { ProjectsLayoutType } from "@/types/layout"
import { ValidatedProjectsSchema } from "@/types/layout"
import ProjectsLayout from "@/components/layout-components/projects-layout"

const Page = ({ params }: { params: { slug: string } }) => {
  if (!MY_APPS.includes(params.slug)) redirect("/404")

  const layout: ProjectsLayoutType = ValidatedProjectsSchema.parse(params.slug)

  return <ProjectsLayout layout={layout} />
}

export default Page
