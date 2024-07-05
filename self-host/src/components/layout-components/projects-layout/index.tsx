/*
 * This file contains code adapted from the Node.js website repository,
 * available at: https://github.com/nodejs/nodejs.org
 * The original code is licensed under the MIT License.
 */

import { Fragment, type FC, type PropsWithChildren } from "react"
import type { ProjectsLayoutType } from "@/types"

import MembameLayout from "@/components/layout-components/components/membame-layout"

const layouts = {
  membame: MembameLayout,
  default: Fragment,
} satisfies Record<ProjectsLayoutType, FC>

type ProjectsLayoutProps<L = ProjectsLayoutType> = PropsWithChildren<{
  layout: L
}>

const ProjectsLayout: FC<ProjectsLayoutProps<ProjectsLayoutType>> = ({
  layout,
  children,
}) => {
  const LayoutComponent = layouts[layout]

  return <LayoutComponent>{children}</LayoutComponent>
}

export default ProjectsLayout
