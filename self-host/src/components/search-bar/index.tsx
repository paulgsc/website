"use client"

import { useMediaQuery } from "@/hooks/use-media-query"

import SearchBarResponsive from "./searchbar-responsive"

const SearchBar = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return <SearchBarResponsive />
  }

  return <></>
}

export default SearchBar
