/*global WindowEventMap */

import type { ASCII } from "./keys"

type KeyBindings<T extends ASCII, K extends keyof WindowEventMap> = {
  keyBinding: T
  eventName: K
}

type SingleKeyBindings = KeyBindings<ASCII, keyof WindowEventMap>

export type ImplForKeyBinding<
  K extends SingleKeyBindings["keyBinding"],
  E extends SingleKeyBindings["eventName"],
> = {
  // eslint-disable-next-line no-unused-vars
  apply: (event: WindowEventMap[E]) => void
  keyBinding: K
  eventName: E
  // eslint-disable-next-line no-unused-vars
  isActive?: (event: WindowEventMap[E], keyBinding: K) => boolean
}

export type SearchBarKeyBinding = KeyBindings<ASCII.SLASH, "keydown">

export function createKeyBindingImpl<
  K extends SingleKeyBindings["keyBinding"],
  E extends SingleKeyBindings["eventName"],
>(impl: ImplForKeyBinding<K, E>): ImplForKeyBinding<K, E> {
  return impl
}
