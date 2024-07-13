// app/components/GitHubCalendar/loading.tsx
import { Skeleton } from "react-activity-calendar"

import { DEFAULT_THEME } from "@/lib/github-calendar/constants"

const Loading = () => {
  return <Skeleton theme={DEFAULT_THEME} loading />
}

export default Loading
