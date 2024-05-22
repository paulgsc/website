export type ContentlayerPageProps = {
  rootPath?: Array<string>
  params: {
    slug: Array<string>
  }
}

export type ContentlayerPagePropsWithoutRootPath = Omit<
  ContentlayerPageProps,
  "rootPath"
>
