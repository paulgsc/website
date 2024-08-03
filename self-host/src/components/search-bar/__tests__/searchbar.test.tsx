import { render } from "@testing-library/react"
import { useQueryState } from "nuqs"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { useEventListener } from "@/hooks/useEventListener"
import SearchBar from "@/components/search-bar"

describe("SearchBar component", () => {
  beforeEach(() => {
    vi.mock("@/hooks/useEventListener", () => ({
      useEventListener: vi.fn(),
    }))

    vi.mock("nuqs", () => ({
      useQueryState: vi.fn(),
      parseAsStringLiteral: vi.fn(() => ({
        withDefault: vi.fn().mockReturnValue({
          parse: vi.fn(),
        }),
      })),
    }))
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("should call useEventListener with correct arguments", () => {
    const useEventListenerMock = vi.mocked(useEventListener)
    const setShowSearch = vi.fn()
    vi.mocked(useQueryState).mockReturnValue([null, setShowSearch])

    render(<SearchBar />)

    expect(useEventListenerMock).toHaveBeenCalledTimes(1)
    expect(useEventListenerMock).toHaveBeenCalledWith(
      "keydown",
      expect.any(Function)
    )
  })

  it('should update showSearch to "searchbar" on "/" keydown', () => {
    const useEventListenerMock = vi.mocked(useEventListener)
    const setShowSearch = vi.fn()
    vi.mocked(useQueryState).mockReturnValue([null, setShowSearch])

    render(<SearchBar />)

    const handler = useEventListenerMock.mock.calls[0][1]
    const event = new KeyboardEvent("keydown", { key: "/" })

    handler(event)

    expect(setShowSearch).toHaveBeenCalledWith("searchbar")
    expect(setShowSearch).toHaveBeenCalledTimes(1)
  })

  it('should not update showSearch on non-"/" keydown', () => {
    const useEventListenerMock = vi.mocked(useEventListener)
    const setShowSearch = vi.fn()
    vi.mocked(useQueryState).mockReturnValue([null, setShowSearch])

    render(<SearchBar />)

    const handler = useEventListenerMock.mock.calls[0][1]
    const event = new KeyboardEvent("keydown", { key: "a" })

    handler(event)

    expect(setShowSearch).not.toHaveBeenCalled()
  })

  it('should not trigger on repeated "/" keydown events', () => {
    const useEventListenerMock = vi.mocked(useEventListener)
    const setShowSearch = vi.fn()
    vi.mocked(useQueryState).mockReturnValue([null, setShowSearch])

    render(<SearchBar />)

    const handler = useEventListenerMock.mock.calls[0][1]
    const event = new KeyboardEvent("keydown", { key: "/", repeat: true })

    handler(event)

    expect(setShowSearch).not.toHaveBeenCalled()
  })

  it('should update showSearch and log message on "/" keydown if contextFromParam is "fragment"', () => {
    const useEventListenerMock = vi.mocked(useEventListener)
    const setShowSearch = vi.fn()
    vi.mocked(useQueryState).mockReturnValue(["fragment", setShowSearch])

    render(<SearchBar />)

    const handler = useEventListenerMock.mock.calls[0][1]
    const event = new KeyboardEvent("keydown", { key: "/" })

    handler(event)

    expect(setShowSearch).toHaveBeenCalledWith("searchbar")
  })

  it('should not update showSearch if contextFromParam is "searchbar"', () => {
    const useEventListenerMock = vi.mocked(useEventListener)
    const setShowSearch = vi.fn()
    vi.mocked(useQueryState).mockReturnValue(["searchbar", setShowSearch])

    render(<SearchBar />)

    const handler = useEventListenerMock.mock.calls[0][1]
    const event = new KeyboardEvent("keydown", { key: "/" })

    handler(event)

    expect(setShowSearch).not.toHaveBeenCalled()
  })

  it('should default to "fragment" if an invalid value is passed', () => {
    const useEventListenerMock = vi.mocked(useEventListener)
    const setShowSearch = vi.fn()
    vi.mocked(useQueryState).mockReturnValue(["invalid", setShowSearch])

    render(<SearchBar />)

    const handler = useEventListenerMock.mock.calls[0][1]
    const event = new KeyboardEvent("keydown", { key: "/" })

    handler(event)

    expect(setShowSearch).toHaveBeenCalledWith("searchbar")
  })
})
