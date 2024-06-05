"use client"

import { useQueryState } from "nuqs"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Icons } from "@/components/icons"

import ChatInput from "./chat-input"
import Messages from "./messages"

const ChatWrapper = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useQueryState("chat")
  return (
    <div className="fixed bottom-24 right-12 z-50 hidden w-fit flex-col-reverse items-end bg-none md:flex">
      <Button
        variant={"ghost"}
        onClick={() => {
          setIsChatbotOpen((prev) => (prev === "on" ? "off" : "on"))
        }}
        role="button"
        className=" me-8 flex size-10 items-center justify-center rounded-full border bg-indigo-100 shadow-sm saturate-150 backdrop-blur-sm 2xl:size-14"
      >
        <span>
          <Icons.cross
            aria-hidden
            className={cn(
              " pointer-events-none absolute inset-1/4 size-5 text-cyan-600 outline-blue-800 transition-all duration-300 ease-in-out 2xl:size-7 dark:text-white",
              {
                "-z-10 bg-muted/50 scale-90 rotate-45 opacity-0":
                  isChatbotOpen !== "on",
              }
            )}
          />

          <Icons.chat
            className={cn(
              "pointer-events-none absolute inset-1/4 size-5 text-cyan-600 outline-blue-800 transition-all duration-300 ease-in-out 2xl:size-7 dark:text-white",
              {
                "-z-10 bg-muted/50 scale-90 opacity-0": isChatbotOpen === "on",
              }
            )}
          />
        </span>
      </Button>
      <article
        className={cn(
          "bg-background z-50 mb-2.5 me-6 grid  h-[calc(100vh-3.5rem-6.25rem)] w-full max-w-md grid-rows-[.5fr_4.5fr_1fr] gap-y-1.5 rounded-lg border  pe-1.5 ps-2.5 shadow-lg outline outline-1 outline-gray-300 backdrop-blur-sm backdrop-brightness-50 2xl:h-[calc(100vh-3.5rem-12rem)]",
          {
            hidden: isChatbotOpen !== "on",
          }
        )}
      >
        <header>some header</header>
        <ScrollArea
          role="article"
          className="w-full max-w-md items-start whitespace-nowrap p-0.5 pb-2.5"
        >
          <Messages />
        </ScrollArea>
        <ChatInput />
      </article>
    </div>
  )
}

export default ChatWrapper
