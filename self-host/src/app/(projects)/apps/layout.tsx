import type { ReactNode } from "react"
import type { Metadata } from "next"
import { constructMetadata } from "@/lib"

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  return constructMetadata({
    title: `App - ${params.slug}`,
    description: `Live app demo for ${params.slug}`,
  })
}

const Layout = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  return <>{children}</>
}

export default Layout
