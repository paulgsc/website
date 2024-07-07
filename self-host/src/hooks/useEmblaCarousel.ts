import { useCallback, useEffect, useRef, useState } from "react"
import type {
  EmblaCarouselType,
  EmblaOptionsType,
  EmblaPluginType,
} from "embla-carousel"
import EmblaCarousel from "embla-carousel"
import { areOptionsEqual, canUseDOM } from "embla-carousel-reactive-utils"

type EmblaViewportRefType = <ViewportElement extends HTMLElement>(
  // eslint-disable-next-line no-unused-vars
  instance: ViewportElement | null
) => void

export type UseEmblaCarouselType = [
  EmblaViewportRefType,
  EmblaCarouselType | undefined,
]

interface UseEmblaCarouselFunction {
  (
    // eslint-disable-next-line no-unused-vars
    options?: EmblaOptionsType,
    // eslint-disable-next-line no-unused-vars
    plugins?: Array<EmblaPluginType>
  ): UseEmblaCarouselType
  globalOptions?: EmblaOptionsType
}

const useEmblaCarousel: UseEmblaCarouselFunction = (
  options: EmblaOptionsType = {},
  plugins: Array<EmblaPluginType> = []
): UseEmblaCarouselType => {
  const storedOptions = useRef(options)
  const storedPlugins = useRef(plugins)
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType>()
  const [viewport, setViewport] = useState<HTMLElement>()

  const reInit = useCallback(() => {
    if (emblaApi) emblaApi.reInit(storedOptions.current, storedPlugins.current)
  }, [emblaApi])

  useEffect(() => {
    if (canUseDOM() && viewport) {
      EmblaCarousel.globalOptions = useEmblaCarousel.globalOptions
      const newEmblaApi = EmblaCarousel(
        viewport,
        storedOptions.current,
        storedPlugins.current
      )
      setEmblaApi(newEmblaApi)
      return () => newEmblaApi.destroy()
    } else {
      setEmblaApi(undefined)
    }
  }, [viewport, setEmblaApi])

  useEffect(() => {
    if (areOptionsEqual(storedOptions.current, options)) return
    storedOptions.current = options
    reInit()
  }, [options, reInit])

  //@todo fix this1!!!
  // useEffect(() => {
  //   if (arePluginsEqual(storedPlugins.current, plugins)) return
  //   storedPlugins.current = plugins
  //   reInit()
  // }, [plugins, reInit])

  return [<EmblaViewportRefType>setViewport, emblaApi]
}

useEmblaCarousel.globalOptions = undefined

export default useEmblaCarousel
