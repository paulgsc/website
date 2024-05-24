import type { AutoplayOptionsType, AutoplayType } from "embla-carousel-autoplay"

import type {
  OptionsHandlerType,
  UpdatedEmblaCarouselType,
} from "@/types/embla-fork"

import { defaultOptions } from "./autoplay-options"

type ScrolDirection = "forward" | "backward"
function Autoplay(userOptions: AutoplayOptionsType = {}): AutoplayType {
  let options: AutoplayOptionsType
  let emblaApi: UpdatedEmblaCarouselType
  let destroyed: boolean
  let playing = false
  let resume = true
  let jump = false
  let timer = 0
  let direction: ScrolDirection = "forward"

  function init(
    emblaApiInstance: UpdatedEmblaCarouselType,
    optionsHandler: OptionsHandlerType
  ): void {
    emblaApi = emblaApiInstance

    const { mergeOptions, optionsAtMedia } = optionsHandler
    const optionsBase = mergeOptions(defaultOptions, Autoplay.globalOptions)
    const allOptions = mergeOptions(optionsBase, userOptions)
    options = optionsAtMedia(allOptions)

    if (emblaApi.scrollSnapList().length <= 1) return

    jump = options.jump
    destroyed = false

    const { eventStore, ownerDocument } = emblaApi.internalEngine()
    const emblaRoot = emblaApi.rootNode()
    const root = (options.rootNode && options.rootNode(emblaRoot)) || emblaRoot
    const container = emblaApi.containerNode()

    emblaApi.on("pointerDown", stopTimer)

    if (!options.stopOnInteraction) {
      emblaApi.on("pointerUp", startTimer)
    }

    if (options.stopOnMouseEnter) {
      eventStore.add(root, "mouseenter", () => {
        resume = false
        stopTimer()
      })

      if (!options.stopOnInteraction) {
        eventStore.add(root, "mouseleave", () => {
          resume = true
          startTimer()
        })
      }
    }

    if (options.stopOnFocusIn) {
      eventStore.add(container, "focusin", stopTimer)

      if (!options.stopOnInteraction) {
        eventStore.add(container, "focusout", startTimer)
      }
    }

    eventStore.add(ownerDocument, "visibilitychange", visibilityChange)

    if (options.playOnInit && !documentIsHidden()) startTimer()
  }

  function destroy(): void {
    emblaApi.off("pointerDown", stopTimer).off("pointerUp", startTimer)
    stopTimer()
    destroyed = true
    playing = false
  }

  function startTimer(): void {
    if (destroyed) return
    if (!resume) return
    if (!playing) emblaApi.emit("autoplay:play")
    const { ownerWindow } = emblaApi.internalEngine()
    ownerWindow.clearInterval(timer)
    timer = ownerWindow.setInterval(next, options.delay)
    playing = true
  }

  function stopTimer(): void {
    if (destroyed) return
    if (playing) emblaApi.emit("autoplay:stop")
    const { ownerWindow } = emblaApi.internalEngine()
    ownerWindow.clearInterval(timer)
    timer = 0
    playing = false
  }

  function visibilityChange(): void {
    if (documentIsHidden()) {
      resume = playing
      return stopTimer()
    }

    if (resume) startTimer()
  }

  function documentIsHidden(): boolean {
    const { ownerDocument } = emblaApi.internalEngine()
    return ownerDocument.visibilityState === "hidden"
  }

  function play(jumpOverride?: boolean): void {
    if (typeof jumpOverride !== "undefined") jump = jumpOverride
    resume = true
    startTimer()
  }

  function stop(): void {
    if (playing) stopTimer()
  }

  function reset(): void {
    if (playing) play()
  }

  function isPlaying(): boolean {
    return playing
  }

  function next(): void {
    const { index } = emblaApi.internalEngine()
    const nextIndex = index.clone().add(1).get()
    const lastIndex = emblaApi.scrollSnapList().length - 1
    const kill = options.stopOnLastSnap && nextIndex === lastIndex

    if (kill) stopTimer()

    const scroll = (next: boolean) => {
      if (next) {
        if (emblaApi.canScrollNext()) {
          emblaApi.scrollNext(jump)
        } else {
          direction = "backward"
          emblaApi.scrollPrev(jump)
        }
      } else {
        if (emblaApi.canScrollPrev()) {
          emblaApi.scrollPrev(jump)
        } else {
          direction = "forward"
          emblaApi.scrollNext(jump)
        }
      }
    }

    scroll(direction === "forward")
  }

  const self: AutoplayType = {
    name: "autoplay",
    options: userOptions,
    init,
    destroy,
    play,
    stop,
    reset,
    isPlaying,
  }
  return self
}

Autoplay.globalOptions = <AutoplayOptionsType | undefined>undefined

export default Autoplay
