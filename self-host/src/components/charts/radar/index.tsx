"use client"

import { Badge } from "@/components/ui/badge"

import ChartContainer from "./chart-container"
import Controls from "./controls"
import MobileNavItems from "./nav/mobile-nav-items"
import ChartSideNav from "./nav/side-nav"

const RadarChartPlayground = () => {
  return (
    <div className="grid w-full md:pl-[56px]">
      <ChartSideNav />
      <div className="flex flex-col">
        <main className="grid flex-1 justify-center gap-4 overflow-auto p-4 max-md:grid-flow-row md:grid-cols-2 lg:grid-cols-3">
          <div
            className="relative max-sm:order-2 max-sm:w-[90vw] md:flex md:flex-col md:items-start md:gap-8"
            x-chunk="dashboard-03-chunk-0"
          >
            <Controls />
          </div>

          <div className="bg-muted/50 relative flex h-full flex-col rounded-xl p-4 max-sm:h-96 max-sm:w-[90vw]  lg:col-span-2 2xl:min-h-[75vh]">
            <Badge variant="outline" className="absolute right-3 top-3">
              Output
            </Badge>
            <div className="w-full flex-1" />
            <ChartContainer />
          </div>
          <MobileNavItems />
        </main>
      </div>
    </div>
  )
}

export default RadarChartPlayground
