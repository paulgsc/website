"use client"

import type { ComponentProps, HTMLAttributes, KeyboardEvent } from "react"
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ArrowRight } from "lucide-react"
import { useQueryState } from "nuqs"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  // eslint-disable-next-line no-unused-vars
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  scrollTo: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)

    const onSelect = useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = useCallback(() => {
      api?.scrollNext()
    }, [api])

    const scrollTo = useCallback(() => {
      if (!api) return
      const { index } = api?.internalEngine() ?? {}
      if (!index) return
      const lastIndex = api?.scrollSnapList().length - 1
      api?.scrollTo(lastIndex, false)
    }, [api])

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)

      return () => {
        api?.off("select", onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          scrollTo,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="w-full">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

type CarouselItemProps = HTMLAttributes<HTMLDivElement> & {
  itemParam?: string
}
const CarouselItem = forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, id, itemParam, ...props }, ref) => {
    const { api, orientation } = useCarousel()
    const [tab, setUrl] = useQueryState(itemParam ?? "")

    const foo = useCallback(
      (api: CarouselApi) => {
        if (!api) return
        const slideIds = api.slideNodes().map((node) => node.id)
        const selectedSlideId = slideIds.at(api.selectedScrollSnap()) ?? ""
        if (itemParam) setUrl(selectedSlideId)
      },
      [itemParam, setUrl]
    )

    useEffect(() => {
      if (!api) return

      if (api) {
        api.on("slidesInView", foo)

        // Cleanup function to remove the event listener
        return () => {
          api.off("slidesInView", foo)
        }
      }
    }, [api, foo])

    useEffect(() => {
      if (!api) return

      const slideIds = api.slideNodes().map((node) => node.id)
      const selectedSlideId = slideIds.at(api.selectedScrollSnap()) ?? ""

      if (tab === selectedSlideId) return

      const tabScrollSnap = slideIds.findIndex((id) => id === tab)

      api.scrollTo(tabScrollSnap)
      api.reInit()
    }, [tab, api])
    return (
      <div
        ref={ref}
        id={id}
        role="group"
        aria-roledescription="slide"
        className={cn(
          "min-w-0 shrink-0 grow-0 basis-full",
          orientation === "horizontal" ? "pl-4" : "pt-4",
          className
        )}
        {...props}
      />
    )
  }
)
CarouselItem.displayName = "CarouselItem"

type CarouselNextProps = ComponentProps<typeof Button> & {
  defaultDirection?: "left" | "right"
}
const CarouselNext = forwardRef<HTMLButtonElement, CarouselNextProps>(
  (
    {
      className,
      variant = "outline",
      size = "icon",
      defaultDirection = "left",
      ...props
    },
    ref
  ) => {
    const {
      orientation,
      scrollNext,
      canScrollNext,
      scrollPrev,
      canScrollPrev,
    } = useCarousel()
    const directionRef = useRef<"left" | "right">(defaultDirection)

    const handleNext = useCallback(() => {
      if (canScrollNext && directionRef.current === "left") {
        scrollNext()
      } else if (!canScrollNext && directionRef.current === "left") {
        directionRef.current = "right"
        scrollPrev()
      } else if (canScrollPrev && directionRef.current === "right") {
        scrollPrev()
      } else if (!canScrollPrev && directionRef.current === "right") {
        directionRef.current = "left"
        scrollNext()
      }
    }, [canScrollNext, canScrollPrev, scrollNext, scrollPrev])

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute size-8 rounded-full",
          orientation === "horizontal"
            ? "-right-12 top-1/2 -translate-y-1/2"
            : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className
        )}
        onClick={handleNext}
        {...props}
      >
        <ArrowRight className="size-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    )
  }
)
CarouselNext.displayName = "CarouselNext"

const CarouselIndicatorContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="indicator"
      className={cn(
        "absolute bottom-5 left-1/2 z-30 flex min-w-0 shrink-0 grow-0 basis-full -translate-x-1/2 space-x-3 rtl:space-x-reverse",
        className
      )}
      {...props}
    />
  )
})

CarouselIndicatorContent.displayName = "CarouselIndicatorContent"

type CarouselIndicatorItemProps = {
  index?: number
  jump?: boolean
} & ComponentProps<typeof Button>

const CarouselIndicatorItem = forwardRef<
  HTMLButtonElement,
  CarouselIndicatorItemProps
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { scrollTo, canScrollNext, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn("m-0 size-3 rounded-full p-0", className)}
      disabled={!canScrollPrev && !canScrollNext}
      onClick={scrollTo}
      {...props}
    />
  )
})
CarouselIndicatorItem.displayName = "CarouselIndicatorItem"

export {
  Carousel,
  CarouselContent,
  CarouselIndicatorContent,
  CarouselIndicatorItem,
  CarouselItem,
  CarouselNext,
  type CarouselApi,
}
