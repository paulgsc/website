import { forwardRef } from "react"

import type { MessageType } from "@/types/chat-bot"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Markdown from "@/components/shared-components/markdown/markdown"

import ChatSiteAvatar from "./chat-site-avatar"

const Message = forwardRef<
  HTMLDivElement,
  { message: MessageType; isNextMessageSamePerson: boolean }
>(({ message }, ref) => {
  return (
    <ScrollArea
      ref={ref}
      role="textbox"
      className="w-full max-w-md items-start whitespace-nowrap p-0.5 pb-2.5"
    >
      <span className="inline-flex items-start space-x-2.5">
        <ChatSiteAvatar />
        {typeof message.content === "string" && (
          <Markdown markdown={message.content} />
        )}
      </span>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
})

Message.displayName = "Message"
export default Message
