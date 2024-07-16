import type { FC, PropsWithChildren } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export type TabItem = Record<string, FC>

type FormTabsProps = {
  tabItems: TabItem
  defaultValue?: string
}

const FormTabs: FC<FormTabsProps> = ({
  defaultValue = "default",
  tabItems,
}) => {
  return (
    <Tabs
      defaultValue={defaultValue}
      className="grid size-full min-h-max grid-flow-col grid-cols-[1fr_4fr] gap-x-1.5"
    >
      <SiteNav>
        {Object.keys(tabItems).map((tab) => (
          <TabsList
            key={tab}
            value={tab}
            className="data-[state=inactive]:bg-background justify-start ps-2.5"
          >
            <TabsTrigger value={tab} className="">
              <span className="capitalize">{tab}</span>
            </TabsTrigger>
          </TabsList>
        ))}
      </SiteNav>
      {Object.entries(tabItems).map(([k, Component]) => (
        <TabsContent
          className=" min-h-dvh ps-6"
          applyPresence={true}
          key={k}
          value={k}
        >
          <Component />
        </TabsContent>
      ))}
    </Tabs>
  )
}

const SiteNav: FC<PropsWithChildren> = ({ children }) => {
  return (
    <aside className="border-r">
      <nav className="text-muted-foreground grid gap-4 pe-2.5 text-sm">
        {children}
      </nav>
    </aside>
  )
}
export default FormTabs
