import type { ContentlayerPageProps } from "@/types"
import { allPages } from "contentlayer/generated"

export async function getPageFromParams({
  params,
  rootPath,
}: ContentlayerPageProps) {
  const allParams = Object.values(params).reduce<Array<string>>((acc, v) => {
    if (typeof v === "string") return [...acc, v]
    return [...acc, ...v]
  }, [])
  const slug = ([] as Array<string>)
    .concat(rootPath ?? [], allParams ?? [])
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
