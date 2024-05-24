import type { UpdatedEmblaCarouselType } from "@/types/embla-fork/carousel"
import type {
  CallbackType,
  EmblaEventType,
  EventHandlerType,
  ListenersType,
} from "@/types/embla-fork/event"

export function EventHandler(): EventHandlerType {
  let listeners: ListenersType = {}
  let api: UpdatedEmblaCarouselType

  function init(emblaApi: UpdatedEmblaCarouselType): void {
    api = emblaApi
  }

  function getListeners(evt: EmblaEventType): Array<CallbackType> {
    return listeners[evt] || []
  }

  function emit(evt: EmblaEventType): EventHandlerType {
    getListeners(evt).forEach((e) => e(api, evt))
    return self
  }

  function on(evt: EmblaEventType, cb: CallbackType): EventHandlerType {
    listeners[evt] = getListeners(evt).concat([cb])
    return self
  }

  function off(evt: EmblaEventType, cb: CallbackType): EventHandlerType {
    listeners[evt] = getListeners(evt).filter((e) => e !== cb)
    return self
  }

  function clear(): void {
    listeners = {}
  }

  const self: EventHandlerType = {
    init,
    emit,
    off,
    on,
    clear,
  }
  return self
}
