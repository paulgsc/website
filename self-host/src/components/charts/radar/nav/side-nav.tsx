import { Triangle } from "lucide-react"

import { Button } from "@/components/ui/button"

import NavItems from "./nav-items"

const ChartSideNav = () => {
  return (
    <aside className="inset-y fixed left-0 z-20 hidden h-full flex-col border-r md:flex">
      <div className="border-b p-2">
        <Button variant="outline" size="icon" aria-label="Home">
          <Triangle className="fill-foreground size-5" />
        </Button>
      </div>
      <NavItems />
    </aside>
  )
}

export default ChartSideNav
