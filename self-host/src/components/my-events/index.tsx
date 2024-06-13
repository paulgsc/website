import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import EventsTimeline from "./events-timeline"

const EventsTimelineWrapper = () => {
  return (
    <Card className="mb-2.5 mt-12 w-full border-none bg-inherit p-1.5 shadow-none lg:max-w-screen-md">
      <CardHeader className="flex flex-row items-start">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Events
          </CardTitle>
          <CardDescription>
            Keep up to date with what events I have planned.
          </CardDescription>
        </div>
      </CardHeader>
      <EventsTimeline />
    </Card>
  )
}

export default EventsTimelineWrapper
