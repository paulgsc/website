import type { FC } from "react"

import {
  ResponsiveDrawer,
  ResponsiveDrawerContent,
  ResponsiveTabsDrawerCloseBtn,
  ResponsiveTabsDrawerTrigger,
  ResponsiveTabsDrawerTriggerBtn,
} from "@/components/responsive-tabs"

const tabButtons = [
  { tabParam: "tab", tabParamVal: "welcome", tabValue: "Karibu" },
  { tabParam: "tab", tabParamVal: "projects", tabValue: "Flagship" },
  { tabParam: "tab", tabParamVal: "welcome", tabValue: "Karibu" },
  { tabParam: "tab", tabParamVal: "log", tabValue: "TLDR" },
  { tabParam: "tab", tabParamVal: "status", tabValue: "Vipi" },
  { tabParam: "tab", tabParamVal: "github", tabValue: "Contribute" },
] as const

const ResponsiveTabsDrawerCloseButtons: FC = () => {
  return (
    <ResponsiveDrawer>
      <ResponsiveTabsDrawerTrigger asChild>
        <ResponsiveTabsDrawerTriggerBtn tabParam="tab" variant="outline" />
      </ResponsiveTabsDrawerTrigger>
      <ResponsiveDrawerContent>
        <div
          role="list"
          className="bg-card flex w-full flex-1 flex-col items-center justify-center "
        >
          {tabButtons.map((button, index) => (
            <ResponsiveTabsDrawerCloseBtn
              key={index}
              tabParam={button.tabParam}
              tabParamVal={button.tabParamVal}
              tabValue={button.tabValue}
              variant="ghost"
              className="w-full"
            />
          ))}
        </div>
      </ResponsiveDrawerContent>
    </ResponsiveDrawer>
  )
}

export default ResponsiveTabsDrawerCloseButtons
