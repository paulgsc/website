"use client"

// eslint-disable-next-line no-restricted-syntax
import React from "react"

import { cn } from "@/lib/utils"

import CodeBlockWrapper from "./code-block-wrapper"

type ComponentSourceProps = {
  src: string
} & React.HTMLAttributes<HTMLDivElement>

const ComponentSource = ({ children, className }: ComponentSourceProps) => {
  return (
    <CodeBlockWrapper
      expandButtonTitle="Expand"
      className={cn("my-6 overflow-hidden rounded-md", className)}
    >
      {children}
    </CodeBlockWrapper>
  )
}

export default ComponentSource
