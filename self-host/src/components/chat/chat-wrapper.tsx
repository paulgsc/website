"use client"

import { cn } from "@/lib/utils"
import useTabNavigation from "@/hooks/use-search-params"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Icons } from "@/components/icons"

import ChatInput from "./chat-input"
import Messages from "./messages"

const ChatWrapper = () => {
  const { handleTabClick, selectedTab } = useTabNavigation({
    tabParam: "chat",
    defaultTab: "off",
  })
  return (
    <div className="fixed bottom-24 right-12 z-50 w-fit bg-none">
      <Popover open={selectedTab === "on"}>
        <PopoverTrigger
          onClick={() => {
            handleTabClick([
              { name: "chat", value: selectedTab === "off" ? "on" : "off" },
            ])
          }}
          role="button"
          className="relative flex size-16 items-center justify-center rounded-full border bg-indigo-100 shadow-sm saturate-150 backdrop-blur-sm 2xl:size-14"
        >
          <span>
            <Icons.cross
              aria-hidden
              className={cn(
                " pointer-events-none absolute inset-1/4 size-7 text-cyan-600 outline-blue-800 transition-all duration-300 ease-in-out dark:text-white",
                {
                  "-z-10 bg-muted/50 scale-90 rotate-45 opacity-0":
                    selectedTab !== "on",
                }
              )}
            />

            <Icons.chat
              className={cn(
                "pointer-events-none absolute inset-1/4 size-7 text-cyan-600 outline-blue-800 transition-all duration-300 ease-in-out dark:text-white",
                {
                  "-z-10 bg-muted/50 scale-90 opacity-0": selectedTab === "on",
                }
              )}
            />
          </span>
        </PopoverTrigger>
        <PopoverContent className="z-50 mb-2.5 me-6 w-full max-w-md border shadow-lg outline outline-1 outline-gray-300 backdrop-blur-sm backdrop-brightness-50">
          <Messages />
          <ChatInput />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default ChatWrapper