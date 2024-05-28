export type ContentlayerPageProps = {
  rootPath?: Array<string>
  params: {
    slug: Array<string>
    category?: string
  }
}

export type ContentlayerPagePropsWithoutRootPath = Omit<
  ContentlayerPageProps,
  "rootPath"
>
