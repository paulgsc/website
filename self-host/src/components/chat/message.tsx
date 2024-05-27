import { forwardRef } from "react"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Markdown from "@/components/shared-components/markdown/markdown"

import ChatSiteAvatar from "./chat-site-avatar"

type MessageProps = {
  id: number
  text: string
  isUserMessage: boolean
  createdAt: string
}

const Message = forwardRef<
  HTMLDivElement,
  { message: MessageProps; isNextMessageSamePerson: boolean }
>(({ message }) => {
  return (
    <ScrollArea
      role="textbox"
      className="w-full max-w-md items-start whitespace-nowrap p-0.5 pb-2.5"
    >
      <span className="inline-flex items-start space-x-2.5">
        <ChatSiteAvatar />
        <Markdown markdown={message.text} />
      </span>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
})

Message.displayName = "Message"
export default Message
