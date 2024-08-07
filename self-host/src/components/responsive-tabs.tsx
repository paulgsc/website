import type { ComponentPropsWithoutRef, ComponentPropsWithRef, FC } from "react"
import { forwardRef } from "react"
import { useSearchParams } from "next/navigation"
import { parseAsString, useQueryState, useQueryStates } from "nuqs"

import { useMediaQuery } from "@/hooks/use-media-query"

import { Button } from "./ui/button"
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"
import withSuspense from "./withSuspense"

const ResponsiveTabs: FC<ComponentPropsWithoutRef<typeof Tabs>> = ({
  defaultValue,
  ...props
}) => {
  const [tabName, setTabName] = useQueryState("tab")
  return (
    <Tabs
      value={tabName ?? defaultValue}
      onValueChange={(val) => setTabName(val)}
      {...props}
    />
  )
}

const ResponsiveTabList: FC<ComponentPropsWithoutRef<typeof TabsList>> = ({
  ...props
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return <TabsList {...props} />
  }

  return <></>
}

const ResponsiveDrawer: FC<ComponentPropsWithoutRef<typeof Drawer>> = ({
  ...props
}) => {
  const [drawerState, setDrawerState] = useQueryState("op")
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return <></>
  }

  return (
    <Drawer
      open={drawerState === "on"}
      onOpenChange={(val) =>
        val ? setDrawerState("on") : setDrawerState("off")
      }
      {...props}
    />
  )
}

const ResponsiveTabListTrigger: FC<
  ComponentPropsWithoutRef<typeof TabsTrigger>
> = ({ ...props }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return <TabsTrigger {...props} />
  }

  return <></>
}

const ResponsiveTabsDrawerTrigger: FC<
  ComponentPropsWithoutRef<typeof DrawerTrigger>
> = ({ ...props }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return <></>
  }

  return <DrawerTrigger {...props} />
}

type ResponsiveTabsDrawerTriggerBtnProps = Omit<
  ComponentPropsWithRef<typeof Button>,
  "children"
> & {
  tabParam: string
}

const ResponsiveTabsDrawerTriggerBtn = forwardRef<
  HTMLButtonElement,
  ResponsiveTabsDrawerTriggerBtnProps
>(({ tabParam, ...props }, ref) => {
  const searchParams = useSearchParams()
  const tabValue = searchParams.get(tabParam)
  return (
    <Button ref={ref} {...props}>
      {tabValue}
    </Button>
  )
})

ResponsiveTabsDrawerTriggerBtn.displayName = "ResponsiveTabsDrawerTriggerBtn"

const ResponsiveDrawerContent: FC<
  ComponentPropsWithoutRef<typeof DrawerContent>
> = ({ ...props }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return <></>
  }

  return <DrawerContent {...props} />
}

type ResponsiveTabsDrawerCloseBtnProps = Omit<
  ComponentPropsWithRef<typeof Button>,
  "children" | "aria-current"
> & {
  tabParam: string
  tabValue: string
  tabParamVal: string
}
const ResponsiveTabsDrawerCloseBtn = forwardRef<
  HTMLButtonElement,
  ResponsiveTabsDrawerCloseBtnProps
>(({ tabParam, tabParamVal, tabValue, ...props }, ref) => {
  const [paramVals, setParamVals] = useQueryStates({
    [tabParam]: parseAsString,
    op: parseAsString,
  })

  return (
    <Button
      ref={ref}
      aria-current={paramVals[tabParam] === tabParamVal}
      onClick={() => {
        setParamVals({
          tab: tabParamVal,
          op: "off",
        })
      }}
      {...props}
    >
      {tabValue}
    </Button>
  )
})

ResponsiveTabsDrawerCloseBtn.displayName = "ResponsiveTabDrawerCloseBtn"

const SuspendedResponsiveTabs = withSuspense(ResponsiveTabs)

export {
  ResponsiveDrawer,
  ResponsiveDrawerContent,
  ResponsiveTabList,
  ResponsiveTabListTrigger,
  ResponsiveTabsDrawerCloseBtn,
  ResponsiveTabsDrawerTrigger,
  ResponsiveTabsDrawerTriggerBtn,
  SuspendedResponsiveTabs,
}
