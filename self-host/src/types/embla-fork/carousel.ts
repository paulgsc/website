import type { EmblaCarouselType } from "embla-carousel"

import type { EventHandlerType } from "./event"

// Update the relevant properties in EmblaCarouselType
export type UpdatedEmblaCarouselType = Omit<
  EmblaCarouselType,
  "off" | "on" | "emit"
> & {
  off: EventHandlerType["off"]
  on: EventHandlerType["on"]
  emit: EventHandlerType["emit"]
}
