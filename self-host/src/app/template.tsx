"use client"

// Add this if WithChat uses client-side hooks
import type { FC, ReactNode } from "react"
import { Suspense } from "react" // Import Suspense

import WithChat from "@/components/chat"

const Template: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      {children}
      <Suspense fallback={<ChatFallback />}>
        <WithChat />
      </Suspense>
    </div>
  )
}

// Fallback component to show while WithChat is loading
const ChatFallback: FC = () => (
  <div className="my-2 animate-pulse rounded-md bg-gray-200 p-4">
    <div className="mb-2 h-4 w-3/4 rounded bg-gray-300"></div>
    <div className="h-4 w-1/2 rounded bg-gray-300"></div>
  </div>
)

export default Template
