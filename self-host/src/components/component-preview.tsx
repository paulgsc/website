"use client"

// eslint-disable-next-line no-restricted-syntax
import React, { Suspense, useMemo } from "react"
import { Index } from "@/__registry__"

import { cn } from "@/lib/utils"
import { useConfig } from "@/hooks/use-config"
import { Icons } from "@/components/icons"
import { styles } from "@/registry/styles"

import CopyButton from "./copy-button"
import ThemeWrapper from "./theme-wrapper"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

type ComponentPreviewProps = {
  name: string
  extractClassname?: boolean
  extractedClassNames?: string
  align?: "center" | "start" | "end"
  description?: string
} & React.HTMLAttributes<HTMLDivElement>

const ComponentPreview = ({
  name,
  children,
  className,
  align = "center",
  ...props
}: ComponentPreviewProps) => {
  const config = useConfig()
  const index = styles.findIndex((style) => style.name === config.style)

  const Codes = React.Children.toArray(children) as Array<React.ReactElement>
  const Code = Codes[index]

  const Preview = useMemo(() => {
    const Component = Index[config.style][name]?.component

    if (!Component) {
      return (
        <p className="text-muted-foreground text-sm">
          Component{" "}
          <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {name}
          </code>{" "}
          not found in registry.
        </p>
      )
    }

    return <Component />
  }, [name, config.style])

  const codeString = useMemo(() => {
    if (
      typeof Code?.props["data-rehype-pretty-code-fragment"] !== "undefined"
    ) {
      const [Button] = React.Children.toArray(
        Code.props.children
      ) as Array<React.ReactElement>
      return Button?.props?.value || Button?.props?.__rawString__ || null
    }
  }, [Code])

  return (
    <div
      className={cn("group relative my-4 flex flex-col space-y-2", className)}
      {...props}
    >
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex items-center justify-between pb-3">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="preview"
              className="text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold shadow-none transition-none data-[state=active]:shadow-none"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold shadow-none transition-none data-[state=active]:shadow-none"
            >
              Code
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="preview" className="relative rounded-md border">
          <div className="flex items-center justify-end p-4">
            <div className="flex items-center gap-2">
              <CopyButton
                value={codeString}
                variant="outline"
                className="text-foreground hover:bg-muted hover:text-foreground size-7 opacity-100 [&_svg]:size-3.5"
              />
            </div>
          </div>
          <ThemeWrapper defaultTheme="zinc">
            <div
              className={cn(
                "preview flex min-h-[350px] w-full justify-center p-10",
                {
                  "items-center": align === "center",
                  "items-start": align === "start",
                  "items-end": align === "end",
                }
              )}
            >
              <Suspense
                fallback={
                  <div className="text-muted-foreground flex items-center text-sm">
                    <Icons.spinner className="mr-2 size-4 animate-spin" />
                    Loading...
                  </div>
                }
              >
                {Preview}
              </Suspense>
            </div>
          </ThemeWrapper>
        </TabsContent>
        <TabsContent value="code">
          <div className="flex flex-col space-y-4">
            <div className="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
              {Code}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ComponentPreview
