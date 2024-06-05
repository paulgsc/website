import type { FC } from "react"
import Image from "next/image"
import { cn } from "@/lib"

import type { CalendarEvent } from "@/types/events-calendar"
import type { IconProps } from "@/types/icons"
import { Badge, badgeVariants } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import AvatarGroup from "@/components/avatar-goup"
import { Icons } from "@/components/icons"

type SocialIconProps = {
  classname: string

  icon: FC<IconProps>
}

const eventIcons: Record<string, SocialIconProps> = {
  youtube: {
    icon: Icons.youtube,
    classname: "ms-2.5 size-8 fill-red-500",
  },
}

const EventCard: FC<CalendarEvent> = ({
  attendees,
  badges,
  image,
  isLive,
  location,
  platform,
  time,
  title,
}) => {
  const EventIcon = eventIcons[platform].icon
  const className = eventIcons[platform].classname

  return (
    <Card className="mx-auto grid grid-rows-[1fr_.2fr] gap-y-1.5 py-2 pe-2.5 ps-1.5">
      <article className="grid grid-cols-[3fr_1fr] text-clip p-1.5">
        <ul className="w-full space-y-2.5 overflow-hidden">
          <li>
            <p className="text-muted-foreground inline-flex shrink-0 items-center justify-start space-x-2.5 text-base uppercase">
              <span
                className={cn(
                  badgeVariants({ variant: "destructive" }),
                  {
                    hidden: isLive,
                  },
                  ""
                )}
              >
                live
              </span>

              <time>{time}</time>
            </p>
          </li>
          <li>
            <h3 className="truncate text-wrap text-lg font-semibold tracking-tight lg:text-xl">
              {title}
            </h3>
          </li>
          <li className="inline-flex shrink-0 items-center gap-x-2.5 ps-1.5">
            <Icons.pin className=" fill-muted text-muted-foreground pointer-events-none size-4 dark:text-white" />
            <Badge variant="outline" className="pointer-events-none rounded-sm">
              {location}
            </Badge>

            <EventIcon className={className} />
          </li>
        </ul>
        <Image
          src={image.src}
          alt={image.alt}
          width={50}
          height={50}
          sizes="240px"
          className="aspect-[3/4] size-auto rounded-sm object-cover transition-all hover:scale-105"
        />
      </article>
      <footer className="flex items-center justify-start gap-2.5">
        {badges.map((badge, index) => (
          <Badge key={index} variant="accent">
            {badge}
          </Badge>
        ))}
        <AvatarGroup avatars={attendees} />
      </footer>
    </Card>
  )
}

export default EventCard
