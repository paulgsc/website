import ChatSiteAvatar from "./chat-site-avatar"

const ChatTopBar = () => {
  return (
    <header className="bg-accent flex w-full shrink-0 items-center justify-between border-b p-1.5">
      <div className="flex items-center gap-2">
        <ChatSiteAvatar />
        <div className="flex flex-col">
          <span className="font-medium">bot</span>
          <span className="text-xs">Active 2 mins ago</span>
        </div>
      </div>
    </header>
  )
}

export default ChatTopBar
