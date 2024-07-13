import type { ComponentPropsWithRef } from "react"
import { forwardRef, useRef } from "react"
import type { AutoplayOptionsType } from "embla-carousel-autoplay"
import Autoplay from "embla-carousel-autoplay"

import { useMediaQuery } from "@/hooks/use-media-query"

import { Carousel } from "./ui/carousel"

type CarouselWithAutoPlayProps = {
  autoplayOptions?: AutoplayOptionsType
} & ComponentPropsWithRef<typeof Carousel>

const CarouselWithAutoPlay = forwardRef<
  HTMLDivElement,
  CarouselWithAutoPlayProps
>(({ autoplayOptions, opts, ...props }, ref) => {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, ...autoplayOptions })
  )

  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <div ref={ref}>
        <Carousel
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={() => {
            plugin.current.play()
          }}
          opts={{ loop: true, ...opts }}
          {...props}
        />
      </div>
    )
  }
  return <Carousel ref={ref} {...props} />
})

CarouselWithAutoPlay.displayName = "CarouselWithAutoPlay"

export { CarouselWithAutoPlay }
