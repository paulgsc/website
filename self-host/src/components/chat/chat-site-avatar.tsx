import { siteConfig } from "@/config"

import { getAcronymFromString, mapAuthorToCardAuthors } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type AvatarProps = {
  fullName: string
  src: string
}
const ChatSiteAvatar = () => {
  const avatar = mapAuthorToCardAuthors(siteConfig.author).at(0) as AvatarProps

  return (
    <Avatar className="size-4">
      <AvatarImage src={avatar.src} />
      <AvatarFallback>{getAcronymFromString(avatar.fullName)}</AvatarFallback>
    </Avatar>
  )
}

export default ChatSiteAvatar
