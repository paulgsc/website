import { render } from "@testing-library/react"
import { useQueryState } from "nuqs"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { useEventListener } from "@/hooks/useEventListener"
import SearchBar from "@/components/search-bar"

describe("SearchBar component", () => {
  beforeEach(() => {
    vi.resetAllMocks()
    vi.mock("@/hooks/useEventListener", () => ({
      useEventListener: vi.fn(),
    }))
    vi.mock("nuqs", () => ({
      useQueryState: vi.fn(),
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

    // Ensure useEventListener is called once with keydown and the handler
    expect(useEventListenerMock).toHaveBeenCalledTimes(1)
    expect(useEventListenerMock).toHaveBeenCalledWith(
      "keydown",
      expect.any(Function)
    )
  })

  it('should update showSearch and log message on "/" keydown', () => {
    const useEventListenerMock = vi.mocked(useEventListener)
    const setShowSearch = vi.fn()
    vi.mocked(useQueryState).mockReturnValue([null, setShowSearch])

    render(<SearchBar />)

    // Get the handler function from the useEventListener mock
    const handler = useEventListenerMock.mock.calls[0][1]

    // Create a KeyboardEvent with key '/'
    const event = new KeyboardEvent("keydown", { key: "/" })

    // Call the handler with the '/' keydown event
    handler(event)

    // Check if setShowSearch was called with '/'
    expect(setShowSearch).toHaveBeenCalledWith("/")
    expect(setShowSearch).toHaveBeenCalledTimes(1)
  })

  it('should not update showSearch on non-"/" keydown', () => {
    const useEventListenerMock = vi.mocked(useEventListener)
    const setShowSearch = vi.fn()
    vi.mocked(useQueryState).mockReturnValue([null, setShowSearch])

    render(<SearchBar />)

    // Get the handler function from the useEventListener mock
    const handler = useEventListenerMock.mock.calls[0][1]

    // Create a KeyboardEvent with a key other than '/'
    const event = new KeyboardEvent("keydown", { key: "a" })

    // Call the handler with the non-'/' keydown event
    handler(event)

    // Ensure setShowSearch is not called
    expect(setShowSearch).not.toHaveBeenCalled()
  })

  it('should not trigger on repeated "/" keydown events', () => {
    const useEventListenerMock = vi.mocked(useEventListener)
    const setShowSearch = vi.fn()
    vi.mocked(useQueryState).mockReturnValue([null, setShowSearch])

    render(<SearchBar />)

    // Get the handler function from the useEventListener mock
    const handler = useEventListenerMock.mock.calls[0][1]

    // Create a KeyboardEvent with key '/' and repeat set to true
    const event = new KeyboardEvent("keydown", { key: "/", repeat: true })

    // Call the handler with the repeated '/' keydown event
    handler(event)

    // Ensure setShowSearch is not called for repeated events
    expect(setShowSearch).not.toHaveBeenCalled()
  })
})
