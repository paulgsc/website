"use client"

// @todo remove this at some point
import { useRef, type FC } from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselIndicatorContent,
  CarouselIndicatorItem,
  CarouselItem,
  CarouselNext,
} from "@/components/ui/carousel"

const Home: FC = () => {
  //@ts-expect-error Migraine inducer
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }))

  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-xs"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={() => {
          plugin.current.play()
        }}
      >
        <CarouselContent>
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem key={index} className="">
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
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselIndicatorItem
              key={index}
              aria-current="true"
              aria-label="Slide 1"
              data-carousel-slide-to="0"
            />
          ))}
        </CarouselIndicatorContent>

        <CarouselNext />
        <CarouselNext />
      </Carousel>
    </main>
  )
}

export default Home
