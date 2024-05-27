"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

interface UseTabNavigationProps {
  tabParam?: string
  defaultTab?: string
}

export interface Param {
  name: string
  value?: string
}

const useTabNavigation = ({
  tabParam,
  defaultTab = "",
}: UseTabNavigationProps) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const handleTabClick = (params: Array<Param>) => {
    const currentSearchParams = new URLSearchParams(searchParams.toString())

    if (params) {
      params.forEach(({ name, value }) => {
        currentSearchParams.set(name, value ?? "")
      })

      router.push(`${pathname}?${currentSearchParams.toString()}`)
    }
  }
  const handleRemoveParam = (params: Array<Param>) => {
    const currentSearchParams = new URLSearchParams(searchParams.toString())
    if (params) {
      params.forEach(({ name, value }) => {
        currentSearchParams.delete(name, value)
      })
      router.push(`${pathname}?${currentSearchParams.toString()}`)
    }
  }

  const selectedTab = (tabParam && searchParams.get(tabParam)) || defaultTab

  const isTabActive = (tabId: string) => {
    return selectedTab === tabId
  }

  return { handleTabClick, handleRemoveParam, isTabActive, selectedTab }
}

export default useTabNavigation
