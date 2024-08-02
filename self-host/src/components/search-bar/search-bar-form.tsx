import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

import SearchBarContextMenu from "./search-context-menu"

const SearchBarForm = () => {
  return (
    <form
      role="search"
      className="bg-primary-foreground flex h-14 flex-1 items-center rounded-full"
    >
      <section className="relative size-full">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
          <Icons.magnifyGlass className="text-muted-foreground size-3 shrink-0" />
        </div>
        <input
          type="text"
          className="bg-card size-full rounded-l-full p-2.5 ps-10 text-sm text-gray-900 outline-none focus:ring-1 dark:text-white"
          placeholder="Search"
          required
        />
        <Button
          variant={"ghost"}
          className="absolute inset-y-0 end-0 flex size-fit h-full items-center rounded-none border-none p-0 px-2.5"
        >
          <Icons.cross className="size-4" />
        </Button>
      </section>
      <SearchBarContextMenu />
    </form>
  )
}

export default SearchBarForm
