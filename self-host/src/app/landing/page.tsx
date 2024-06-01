"use client"

import { useRef, type FC } from "react"

import Autoplay from "@/lib/embla-fork/autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselIndicatorContent,
  CarouselIndicatorItem,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import GitHubCalendar from "@/components/github-calendar"

const Home: FC = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }))

  return (
    <main className="flex  flex-col items-center justify-between ">
      <GitHubCalendar username={"paulgsc"} fontSize={16} throwOnError />
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-xs"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.play}
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselIndicatorContent>
          {Array.from({ length: 4 }).map((_, index) => (
            <CarouselIndicatorItem
              key={index}
              aria-current="true"
              aria-label="Slide 1"
              data-carousel-slide-to="0"
            />
          ))}
        </CarouselIndicatorContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </main>
  )
}

export default Home
