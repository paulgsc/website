import { cn } from "@/lib"

import { badgeVariants } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import ActiveLink from "@/components/active-link"

const BlogCategories = () => {
  return (
    <nav className="mt-1.5 flex w-full justify-center">
      <ScrollArea className=" max-w-xs grow whitespace-nowrap py-3 md:max-w-2xl xl:max-w-[980px] 2xl:max-w-[1460px]">
        <div className="flex w-full flex-1 items-center justify-around gap-6">
          {Array.from({ length: 5 }, (_, index) => (
            <ActiveLink
              key={index}
              href={"/"}
              target="_blank"
              rel="noreferrer"
              className={cn(
                badgeVariants({ variant: "accent" }),
                "hover:bg-background rounded-md pe-2.5 ps-2.5 saturate-150"
              )}
              activeClassName={cn(badgeVariants({ variant: "default" }))}
            >
              API Reference
            </ActiveLink>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </nav>
  )
}

export default BlogCategories
