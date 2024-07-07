"use client"

import type { FC } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"

import { TooltipProvider } from "./ui/tooltip"

const client = new QueryClient()

const Providers: FC<ThemeProviderProps> = ({ children, ...props }) => {
  return (
    <NextThemesProvider {...props}>
      <TooltipProvider>
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      </TooltipProvider>
    </NextThemesProvider>
  )
}

export default Providers
