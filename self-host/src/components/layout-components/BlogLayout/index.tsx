/*
 * This file contains code adapted from the Node.js website repository,
 * available at: https://github.com/nodejs/nodejs.org
 * The original code is licensed under the MIT License.
 */

import { Fragment, type FC, type PropsWithChildren } from "react"
import type { BlogLayoutType } from "@/types"

import ChannelLayout from "@/components/layout-components/components/channel-layout"

const layouts = {
  channel: ChannelLayout,
  default: Fragment,
} satisfies Record<BlogLayoutType, FC>

type BlogLayoutProps<L = BlogLayoutType> = PropsWithChildren<{ layout: L }>

const BlogLayout: FC<BlogLayoutProps<BlogLayoutType>> = ({
  layout,
  children,
}) => {
  const LayoutComponent = layouts[layout]

  return <LayoutComponent>{children}</LayoutComponent>
}

export default BlogLayout
