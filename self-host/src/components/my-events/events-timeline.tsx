import type { TimelineDay } from "@/types"

import {
  Timeline,
  TimelineContent,
  TimelineDot,
  TimelineHeading,
  TimelineItem,
  TimelineLine,
} from "@/components/ui/timeline"

import EventCard from "./event-card"

const timelineData: Array<TimelineDay> = [
  {
    date: new Date(),
    events: [
      {
        time: "5:00 pm",
        title:
          "Ignite: Practical AI Implementation for Executive Decision-making in the Age of AI",
        location: "Online",
        platform: "youtube",
        image: {
          src: "https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80",
          alt: "Event image",
        },
        isLive: true,
        badges: ["AI", "Executive"],
        attendees: [
          {
            src: "https://avatars.githubusercontent.com/paulgsc",
            alt: "avatar1",
          },
          {
            src: "https://avatars.githubusercontent.com/paulgsc",
            alt: "avatar2",
          },
        ],
      },
    ],
  },
]

const EventsTimeline = () => {
  return (
    <Timeline>
      {timelineData.map((day, index) => (
        <TimelineItem key={index} status={"default"}>
          {
            <TimelineHeading className="inline-flex shrink-0 gap-x-1.5 tracking-wide">
              <span>{JSON.stringify(day.date)}</span>
              <span className="text-muted-foreground/45">
                {JSON.stringify(day.date)}
              </span>
            </TimelineHeading>
          }
          <TimelineDot
            status={"default"}
            className="dark:bg-muted size-3 border-gray-300 bg-gray-300"
          />
          <TimelineLine />
          {day.events.map((e, index) => (
            <TimelineContent
              key={index}
              className="mt-3 w-full lg:max-w-lg xl:max-w-xl"
            >
              <EventCard {...e} />
            </TimelineContent>
          ))}
        </TimelineItem>
      ))}
    </Timeline>
  )
}

export default EventsTimeline
