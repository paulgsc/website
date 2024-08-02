"use client"

import { searchBarRenderSchema } from "@/types"
import { useQueryState } from "nuqs"

import WithSearchBar from "./with-search-bar"

// @todo implmenent the onevent listener of keydown "/" to show searchbar
// @todo maybe make it animate?
const SearchBar = () => {
  const [showSearch, setShowSearch] = useQueryState("seshow")

  const contextFromParam =
    searchBarRenderSchema.safeParse(showSearch).data ?? "fragment"

  return <WithSearchBar showSearch={contextFromParam} />
}

export default SearchBar
