import type {
  ImplForKeyBinding,
  SingleKeyBindings,
} from "@/types/key-bindings/key-traits-utilities"

export function createKeyBindingImpl<
  K extends SingleKeyBindings["keyBinding"],
  E extends SingleKeyBindings["eventName"],
>(impl: ImplForKeyBinding<K, E>): ImplForKeyBinding<K, E> {
  return impl
}
