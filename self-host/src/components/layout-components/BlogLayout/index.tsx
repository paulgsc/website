/*
 * This file contains code adapted from the Node.js website repository,
 * available at: https://github.com/nodejs/nodejs.org
 * The original code is licensed under the MIT License.
 */

import { Fragment, type FC, type PropsWithChildren } from "react"
import type { Layouts } from "@/types"

import ChannelLayout from "@/components/layout-components/components/channel-layout"

const layouts = {
  channel: ChannelLayout,
  default: Fragment,
} satisfies Record<Layouts, FC>

type BlogLayoutProps<L = Layouts> = PropsWithChildren<{ layout: L }>

const BlogLayout: FC<BlogLayoutProps<Layouts>> = ({ layout, children }) => {
  const LayoutComponent = layouts[layout]

  return <LayoutComponent>{children}</LayoutComponent>
}

export default BlogLayout
