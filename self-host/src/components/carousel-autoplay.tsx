import { useRef, type ComponentPropsWithoutRef, type FC } from "react"

import Autoplay from "@/lib/embla-fork/autoplay"
import { useMediaQuery } from "@/hooks/use-media-query"

import { Carousel } from "./ui/carousel"

const CarouselWithAutoPlay: FC<ComponentPropsWithoutRef<typeof Carousel>> = ({
  ...props
}) => {
  const plugin = useRef(Autoplay({ delay: 30000, stopOnInteraction: true }))
  const isDesktop = useMediaQuery("(min-width: 768px)")
  if (isDesktop) {
    return (
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.play}
        {...props}
      />
    )
  }
  return <Carousel {...props} />
}

export { CarouselWithAutoPlay }
