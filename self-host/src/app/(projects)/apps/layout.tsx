/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { ReactNode } from "react"
import type { Metadata } from "next"
import { constructMetadata } from "@/lib"

export function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Metadata {
  return constructMetadata({
    title: `App - ${params.slug}`,
    description: `Live app demo for ${params.slug}`,
  })
}

const Layout = ({
  children,
}: Readonly<{
  children: ReactNode
}>): JSX.Element => {
  return <>{children}</>
}

export default Layout
;("invalid ts") // not invalid

const foo = (bar: string): number => [bar]

const test: string[] = foo(5)

export { test }

// some comment
