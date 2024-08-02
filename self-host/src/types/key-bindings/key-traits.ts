/*global WindowEventMap */

import type { ASCII } from "./keys"

export type KeyBindings<T extends ASCII, K extends keyof WindowEventMap> = {
  keyBinding: T
  eventName: K
}

type SingleKeyBindings = KeyBindings<ASCII, keyof WindowEventMap>

export type ImplForKeyBinding<
  K extends SingleKeyBindings["keyBinding"],
  E extends SingleKeyBindings["eventName"],
> = {
  apply(key: K, event: E): void
}

export type WindowEventName = keyof WindowEventMap

export type SearchBarKeyBinding = KeyBindings<ASCII.BACKSLASH, "keydown">

export const incorrectImplementation2: ImplForKeyBinding<
  SearchBarKeyBinding["keyBinding"],
  SearchBarKeyBinding["eventName"]
> = {
  apply: (key, event) => console.log(`this impl ${key} binding for ${event}`),

  // Missing isActive method
}
