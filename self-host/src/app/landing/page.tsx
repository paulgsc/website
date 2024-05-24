"use client"

import { useRef, type FC } from "react"

import Autoplay from "@/lib/embla-fork/autoplay"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const Home: FC = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }))

  return (
    <main className="flex  flex-col items-center justify-between ">
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
        <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse">
          {Array.from({ length: 4 }).map((_, index) => (
            <Button
              key={index}
              className="m-0 size-3 rounded-full p-0"
              aria-current="true"
              aria-label="Slide 1"
              data-carousel-slide-to="0"
            ></Button>
          ))}
        </div>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </main>
  )
}

export default Home
