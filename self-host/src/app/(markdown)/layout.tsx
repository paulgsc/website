import type { ReactNode } from "react"
import type { Metadata } from "next"
import { constructMetadata, getPageFromParams } from "@/lib"
import type { ContentlayerPagePropsWithoutRootPath } from "@/types"

import type { OpenGraphType } from "@/lib/seo"
import WithChat from "@/components/chat"
import withSuspense from "@/components/withSuspense"

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

const SuspendedChat = withSuspense(WithChat)

const Layout = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  return (
    <>
      {children}
      <SuspendedChat />
    </>
  )
}

export default Layout
