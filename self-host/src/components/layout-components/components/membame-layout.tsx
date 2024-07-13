import type { FC } from "react"

import ChromeTabs from "@/components/membame/chrome-tabs"

const MembameLayout: FC = () => (
  <main className="grid grid-flow-row grid-rows-[40%_auto] xl:h-[calc(var(--vh)-5.8rem)] 2xl:h-[calc(var(--vh)-5rem)]">
    <div className="grid grid-flow-col grid-cols-[1fr_3fr_1fr] bg-purple-300">
      <div className=""></div>
      <div className="border-x " />
      <div className="" />
    </div>
    <div className="grid grid-flow-col grid-cols-[4fr_1fr] bg-green-500">
      <ChromeTabs />
      <div className="grid grid-flow-row">
        <div className="even:border-y" />
        <div className="even:border-y" />
        <div className="hidden even:border-y 2xl:block" />
      </div>
    </div>
  </main>
)

export default MembameLayout
