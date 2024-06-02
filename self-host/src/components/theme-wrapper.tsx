"use client"

import type { ComponentProps, CSSProperties, FC } from "react"

import { cn } from "@/lib/utils"
import { useConfig } from "@/hooks/use-config"

type ThemeWrapperProps = {
  defaultTheme?: string
} & ComponentProps<"div">

const ThemeWrapper: FC<ThemeWrapperProps> = ({
  defaultTheme,
  children,
  className,
}) => {
  const config = useConfig()

  return (
    <div
      className={cn(
        `theme-${defaultTheme || config.theme}`,
        "w-full",
        className
      )}
      style={
        {
          "--radius": `${defaultTheme ? 0.5 : config.radius}rem`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  )
}

export default ThemeWrapper
