import type { ReactNode } from "react"
import type { Metadata } from "next"
import { constructMetadata, getPageFromParams } from "@/lib"
import type { ContentlayerPagePropsWithoutRootPath } from "@/types"

import type { OpenGraphType } from "@/lib/seo"

export async function generateMetadata({
  params,
}: ContentlayerPagePropsWithoutRootPath): Promise<Metadata> {
  const doc = await getPageFromParams({ params })

  if (!doc) {
    return {}
  }
  return constructMetadata({
    title: doc.title,
    description: doc.description,
    type: (doc.openGraphMetaType as OpenGraphType) ?? "website",
    url: doc.slug,
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
