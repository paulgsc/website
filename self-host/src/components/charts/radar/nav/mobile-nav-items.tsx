import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

import NavItems from "./nav-items"

const MobileNavItems = () => {
  return (
    <ScrollArea className="block w-[90vw] whitespace-nowrap rounded-md border md:hidden">
      <NavItems />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

export default MobileNavItems
