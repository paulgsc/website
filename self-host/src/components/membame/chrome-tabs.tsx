import { Suspense } from "react"

import ChromeTabsCard from "./chrome-tabs-card"
import Loading from "./loading"

const ChromeTabs = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ChromeTabsCard />
    </Suspense>
  )
}

export default ChromeTabs
