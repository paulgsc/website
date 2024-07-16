import { Fragment } from "react"

import { BannerMessageForm } from "./banner-msg"
import type { TabItem } from "./forms-tabs"
import FormTabs from "./forms-tabs"

const BannerFormsCard = () => {
  const bannerConfigs = {
    message: BannerMessageForm,
    appearnce: Fragment,
    controls: Fragment,
  } satisfies TabItem
  return <FormTabs tabItems={bannerConfigs} />
}

export default BannerFormsCard
