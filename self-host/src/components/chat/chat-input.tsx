import { useRef } from "react"

import { Textarea } from "@/components/ui/textarea"

const ChatInput = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  return (
    <div className="w-full">
      <div className="mx-2 flex flex-row md:mx-4  lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <div className="relative flex h-full flex-1 items-stretch md:flex-col">
          <div className="relative flex w-full grow flex-col p-4">
            <div className="relative">
              <Textarea
                rows={1}
                ref={textareaRef}
                autoFocus
                value={""}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()

                    console.log("foo")

                    textareaRef.current?.focus()
                  }
                }}
                placeholder="Enter your question..."
                className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch resize-none py-3 pr-12 text-base"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatInput
