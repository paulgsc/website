"use client"

import { searchBarRenderSchema } from "@/types"
import { useQueryState } from "nuqs"

import { type SearchBarKeyBinding } from "@/types/key-bindings/key-traits-utilities"
import { ASCII } from "@/types/key-bindings/keys"
import { createKeyBindingImpl } from "@/lib/key-bindings"
import { useEventListener } from "@/hooks/useEventListener"

import WithSearchBar from "./with-search-bar"

// @todo implmenent the onevent listener of keydown "/" to show searchbar
// @todo maybe make it animate?
const SearchBar = () => {
  const [showSearch, setShowSearch] = useQueryState("seshow")

  const contextFromParam =
    searchBarRenderSchema.safeParse(showSearch).data ?? "fragment"

  const slashKeyBinding = createKeyBindingImpl<
    SearchBarKeyBinding["keyBinding"],
    SearchBarKeyBinding["eventName"]
  >({
    apply: (event) => {
      event.preventDefault()
      setShowSearch("/")
    },
    eventName: "keydown",
    keyBinding: ASCII.SLASH,
    isActive: (event, keyBinding) =>
      event.key.charCodeAt(0) === keyBinding && !event.repeat,
  })

  useEventListener(slashKeyBinding.eventName, (event: KeyboardEvent) => {
    if (slashKeyBinding.isActive?.(event, slashKeyBinding.keyBinding)) {
      slashKeyBinding.apply(event)
    }
  })
  return <WithSearchBar showSearch={contextFromParam} />
}

export default SearchBar
