import { create } from "zustand"

import type { MessageType } from "@/types/chat-bot"

// Define the initial state type
type InitialState = {
  messages: Array<MessageType>
  isLoading: boolean
}

// Define the actions type
type Actions = {
  // eslint-disable-next-line no-unused-vars
  addMessage: (message: MessageType) => void
  // eslint-disable-next-line no-unused-vars
  setLoading: (loading: boolean) => void
}

// Combine the state and actions into a single type for the store
type Store = InitialState & Actions

// Define the initial state
const initialState: InitialState = {
  messages: [],
  isLoading: false,
}

// Create the Zustand store with the combined type
const useMessagesStore = create<Store>((set) => ({
  ...initialState,

  // Action to add a new message
  addMessage: (message: MessageType) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  // Action to set the loading state
  setLoading: (loading: boolean) =>
    set({
      isLoading: loading,
    }),
}))

// Create a selector to get the messages
const useMessages = (): Array<MessageType> =>
  useMessagesStore((state) => state.messages)

// Create a selector to get the loading state
const useIsLoading = (): boolean => useMessagesStore((state) => state.isLoading)

export default useMessagesStore
export { useIsLoading, useMessages }
