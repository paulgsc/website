/*
 * This file contains code adapted from the Node.js website repository,
 * available at: https://github.com/nodejs/nodejs.org
 * The original code is licensed under the MIT License.
 */

import type { FC, PropsWithoutRef } from "react"
import { Fragment } from "react"
import type { ProjectsLayoutType } from "@/types"

import MembameLayout from "@/components/layout-components/components/membame-layout"
import MySuperPowersLayout from "@/components/layout-components/components/my-superpowers-layout"
import StreamingBannersLayout from "@/components/layout-components/components/streaming-banners-layout"

const layouts = {
  membame: MembameLayout,
  "membame/charts": MembameLayout,
  "streaming/banners": StreamingBannersLayout,
  "my-superpowers": MySuperPowersLayout,
  default: Fragment,
} satisfies Record<ProjectsLayoutType, FC>

type ProjectsLayoutProps<L = ProjectsLayoutType> = PropsWithoutRef<{
  layout: L
}>

const ProjectsLayout: FC<ProjectsLayoutProps<ProjectsLayoutType>> = ({
  layout,
}) => {
  const LayoutComponent = layouts[layout]

  return <LayoutComponent />
}

export default ProjectsLayout
