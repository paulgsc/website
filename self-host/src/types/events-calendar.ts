type AttendeeAvatar = {
  src: string
  alt: string
}

type EventImage = {
  src: string
  alt: string
}

type PlatformType = "youtube" | "twitch" | "vimeo" | "other"
type LocationType = "Online" | "In-Person" | "Hybrid"
type BadgeType = string

export type CalendarEvent = {
  time: string
  title: string
  location: LocationType
  platform: PlatformType
  image: EventImage
  isLive: boolean
  badges: Array<BadgeType>
  attendees: Array<AttendeeAvatar>
}

export type TimelineDay = {
  date: Date
  events: Array<CalendarEvent>
}
