"use client"

import type {
  ComponentProps,
  ComponentPropsWithRef,
  HTMLAttributes,
  ImgHTMLAttributes,
} from "react"
import Image from "next/image"
import Link from "next/link"
import type { NpmCommands, Style } from "@/types"
import { useMDXComponent } from "next-contentlayer2/hooks"

import type { Event } from "@/lib/events"
import cn from "@/lib/utils/cn"
import { useConfig } from "@/hooks/use-config"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import type { Card } from "@/components/ui/card"
import { CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Callout from "@/components/callout"
import { CarouselWithAutoPlay } from "@/components/carousel-autoplay"
import CodeBlockWrapper from "@/components/code-block-wrapper"
import CopyButton, { CopyNpmCommandButton } from "@/components/copy-button"
import FrameworkDocs from "@/components/framework-docs"
import ResponsiveTabsDrawerCloseButtons from "@/components/landing/drawer-tab-list"
import { BorderBeam } from "@/components/magicui/border-beam"
import MdxCard from "@/components/mdx-card"
import {
  ResponsiveTabList,
  ResponsiveTabListTrigger,
  SuspendedResponsiveTabs,
} from "@/components/responsive-tabs"
import YoutubeBadge from "@/components/youtube-badge"

const components = {
  YoutubeBadge,
  BorderBeam,
  CarouselWithAutoPlay,
  CarouselContent,
  CarouselItem,
  ResponsiveTabsDrawerCloseButtons,
  h1: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn("font-heading scroll-m-20 text-4xl font-bold", className)}
      {...props}
    />
  ),
  h2: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "font-heading scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={cn(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={cn(
        "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: HTMLAttributes<HTMLElement>) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: HTMLAttributes<HTMLElement>) => (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    />
  ),
  img: ({ className, alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn("rounded-md", className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }: HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-4 md:my-8" {...props} />
  ),
  table: ({ className, ...props }: HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn("even:bg-muted m-0 border-t p-0", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  pre: ({
    className,
    __rawString__,
    __npmCommand__,
    __yarnCommand__,
    __pnpmCommand__,
    __bunCommand__,
    __withMeta__,
    __src__,
    __event__,

    __style__,
    ...props
  }: HTMLAttributes<HTMLPreElement> & {
    __style__?: Style["name"]
    __rawString__?: string
    __withMeta__?: boolean
    __src__?: string
    __event__?: Event["name"]
  } & NpmCommands) => {
    return (
      <>
        <pre
          className={cn(
            "mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900",
            className
          )}
          {...props}
        />
        {__rawString__ && !__npmCommand__ && (
          <CopyButton
            value={__rawString__}
            src={__src__}
            event={__event__}
            className={cn("absolute right-4 top-4", __withMeta__ && "top-16")}
          />
        )}
        {__npmCommand__ &&
          __yarnCommand__ &&
          __pnpmCommand__ &&
          __bunCommand__ && (
            <CopyNpmCommandButton
              commands={{
                __npmCommand__,
                __yarnCommand__,
                __pnpmCommand__,
                __bunCommand__,
              }}
              className={cn("absolute right-4 top-4", __withMeta__ && "top-16")}
            />
          )}
      </>
    )
  },
  code: ({ className, ...props }: HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm",
        className
      )}
      {...props}
    />
  ),
  Image,
  Callout,
  AspectRatio,
  CodeBlockWrapper: ({ ...props }) => (
    <CodeBlockWrapper className="rounded-md border" {...props} />
  ),
  Step: ({ className, ...props }: ComponentProps<"h3">) => (
    <h3
      className={cn(
        "font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  Steps: ({ ...props }) => (
    <div
      className="[&>h3]:step steps mb-12 ml-4 border-l pl-8 [counter-reset:step]"
      {...props}
    />
  ),
  Tabs: ({ className, ...props }: ComponentProps<typeof Tabs>) => (
    <Tabs className={cn("w-full", className)} {...props} />
  ),
  ResponsiveTabs: ({
    className,
    ...props
  }: ComponentProps<typeof SuspendedResponsiveTabs>) => (
    <SuspendedResponsiveTabs className={cn("w-full", className)} {...props} />
  ),
  TabsList: ({ className, ...props }: ComponentProps<typeof TabsList>) => (
    <TabsList
      className={cn(
        "w-full justify-start rounded-none border-b bg-transparent p-0",
        className
      )}
      {...props}
    />
  ),
  ResponsiveTabsList: ({
    className,
    ...props
  }: ComponentProps<typeof ResponsiveTabList>) => (
    <ResponsiveTabList
      className={cn(
        "w-full justify-start rounded-none border-b bg-transparent p-0",
        className
      )}
      {...props}
    />
  ),
  TabsTrigger: ({
    className,
    ...props
  }: ComponentProps<typeof TabsTrigger>) => (
    <TabsTrigger
      className={cn(
        "text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold shadow-none transition-none data-[state=active]:shadow-none",
        className
      )}
      {...props}
    />
  ),
  ResponsiveTabsTrigger: ({
    className,
    ...props
  }: ComponentProps<typeof ResponsiveTabListTrigger>) => (
    <ResponsiveTabListTrigger
      className={cn(
        "text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold shadow-none transition-none data-[state=active]:shadow-none",
        className
      )}
      {...props}
    />
  ),
  TabsContent: ({
    className,
    ...props
  }: ComponentProps<typeof TabsContent>) => (
    <TabsContent
      className={cn(
        "relative w-full [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold",
        className
      )}
      {...props}
    />
  ),
  TabsContentWithBeam: ({
    className,
    children,
    ...props
  }: ComponentProps<typeof TabsContent>) => (
    <TabsContent
      className={cn(
        "relative w-full rounded-md [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold",
        className
      )}
      {...props}
    >
      {children}
      <BorderBeam duration={30} borderWidth={3} />
    </TabsContent>
  ),
  FrameworkDocs: ({
    className,
    ...props
  }: ComponentProps<typeof FrameworkDocs>) => (
    <FrameworkDocs className={cn(className)} {...props} />
  ),
  Link: ({ className, ...props }: ComponentProps<typeof Link>) => (
    <Link
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  ),
  LinkedCard: ({ className, ...props }: ComponentProps<typeof Link>) => (
    <Link
      className={cn(
        "bg-card text-card-foreground hover:bg-muted/50 flex w-full flex-col items-center rounded-xl border p-6 shadow transition-colors sm:p-10",
        className
      )}
      {...props}
    />
  ),
  Section: ({ className, ...props }: ComponentPropsWithRef<typeof Card>) => (
    <section
      className={cn(
        "items-center max-sm:max-w-xs lg:flex lg:flex-1 lg:gap-x-12",
        className
      )}
      {...props}
    />
  ),
  Card: MdxCard,
}

type MdxProps = {
  code: string
}

const Mdx = ({ code }: MdxProps) => {
  const config = useConfig()
  const Component = useMDXComponent(code, {
    style: config.style,
  })

  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  )
}

export default Mdx
