"use client"

import type { HTMLAttributes } from "react"
import { allPages } from "contentlayer/generated"

import Mdx from "./mdx-components"

type FrameworkDocsProps = {
  data: string
} & HTMLAttributes<HTMLDivElement>

const FrameworkDocs = ({ ...props }: FrameworkDocsProps) => {
  const frameworkDoc = allPages.find(
    (doc) => doc.slug === `/docs/installation/${props.data}`
  )

  if (!frameworkDoc) {
    return null
  }

  return <Mdx code={frameworkDoc.body.code} />
}

export default FrameworkDocs
