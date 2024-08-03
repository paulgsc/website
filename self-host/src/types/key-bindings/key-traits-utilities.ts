/*global WindowEventMap */

import type { ASCII } from "./keys"

type KeyBindings<T extends ASCII, K extends keyof WindowEventMap> = {
  keyBinding: T
  eventName: K
}

export type SingleKeyBindings = KeyBindings<ASCII, keyof WindowEventMap>

export type ImplForKeyBinding<
  K extends SingleKeyBindings["keyBinding"],
  E extends SingleKeyBindings["eventName"],
> = {
  apply: (event: WindowEventMap[E]) => void
  keyBinding: K
  eventName: E

  isActive?: (event: WindowEventMap[E], keyBinding: K) => boolean
}

export type SearchBarKeyBinding = KeyBindings<ASCII.SLASH, "keydown">
