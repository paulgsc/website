import { cn } from "@/lib"

import { badgeVariants } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import ActiveLink from "@/components/active-link"

const categories = [
  "all posts",
  "updates",
  "odoo",
  "next js",
  "self hosting",
  "rust",
  "projects",
] as const
const BlogCategories = () => {
  return (
    <nav className="mt-1.5 flex w-full justify-center">
      <ScrollArea className=" max-w-xs grow whitespace-nowrap py-3 md:max-w-2xl xl:max-w-[980px] 2xl:max-w-[1460px]">
        <div className="flex w-full flex-1 items-center justify-around gap-6">
          {categories.map((category, index) => (
            <ActiveLink
              key={index}
              href={"/"}
              target="_blank"
              className={cn(
                badgeVariants({ variant: "accent" }),
                "hover:bg-background shrink-0 rounded-md pe-2.5 ps-2.5 text-sm capitalize tracking-tight saturate-150"
              )}
              activeClassName={cn(badgeVariants({ variant: "default" }))}
            >
              {category}
            </ActiveLink>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </nav>
  )
}

export default BlogCategories
