/* eslint-disable no-unused-vars */
import type { UpdatedEmblaCarouselType } from "./carousel"

export type CallbackType = (
  emblaApi: UpdatedEmblaCarouselType,
  evt: EmblaEventType
) => void
export type ListenersType = Partial<{
  [key in EmblaEventType]: Array<CallbackType>
}>

export type EmblaEventType = EmblaEventListType[keyof EmblaEventListType]

export interface EmblaEventListType {
  init: "init"
  pointerDown: "pointerDown"
  pointerUp: "pointerUp"
  slidesChanged: "slidesChanged"
  slidesInView: "slidesInView"
  scroll: "scroll"
  select: "select"
  settle: "settle"
  destroy: "destroy"
  reInit: "reInit"
  resize: "resize"
  slideFocus: "slideFocus"
  autoplayPlay: "autoplay:play"
  autoplayStop: "autoplay:stop"
}

export type EventHandlerType = {
  init: (emblaApi: UpdatedEmblaCarouselType) => void
  emit: (evt: EmblaEventType) => EventHandlerType
  on: (evt: EmblaEventType, cb: CallbackType) => EventHandlerType
  off: (evt: EmblaEventType, cb: CallbackType) => EventHandlerType
  clear: () => void
}
