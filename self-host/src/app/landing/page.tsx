"use client"

// @todo remove this at some point
import type { FC } from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  CarouselContent,
  CarouselIndicatorContent,
  CarouselIndicatorItem,
  CarouselItem,
  CarouselNext,
} from "@/components/ui/carousel"
import { CarouselWithAutoPlay } from "@/components/carousel-autoplay"

const Home: FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <CarouselWithAutoPlay
        className="w-full max-w-xs"
        opts={{ loop: true }}
        autoplayOptions={{ delay: 3000, stopOnInteraction: true }}
        itemParam="test"
      >
        <CarouselContent>
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem key={index} className="" id={`${1 + index}`}>
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
      </CarouselWithAutoPlay>
    </main>
  )
}

export default Home
