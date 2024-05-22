import type { ContentlayerPageProps } from "@/types"
import { allPages } from "contentlayer/generated"

export async function getPageFromParams({
  params,
  rootPath,
}: ContentlayerPageProps) {
  const slug = ([] as Array<string>)
    .concat(rootPath ?? [], params.slug ?? [])
    .join("/")

  const doc = allPages.find((doc) => doc.slugAsParams === slug)

  if (!doc) {
    return null
  }

  return doc
}

export async function generateStaticParams({
  rootPath,
}: Pick<ContentlayerPageProps, "rootPath">): Promise<
  Array<ContentlayerPageProps["params"]>
> {
  return allPages.map((doc) => ({
    slug: doc.slugAsParams.split("/"),
    rootPath: rootPath,
  }))
}
