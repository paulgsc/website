import type { FC } from "react"
import { siteConfig } from "@/config"

import { Icons } from "./icons"
import SharedBadge from "./shared-components/badge-link"

const YoutubeBadge: FC = () => {
  return (
    <SharedBadge
      badgeVariant="outline"
      href={siteConfig.links.youtube}
      badgeText={<Icons.youtube className="size-6 text-red-500" />}
    >
      I also have a youtube channel.
    </SharedBadge>
  )
}

export default YoutubeBadge
