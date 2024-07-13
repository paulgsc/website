import { CircleHelp } from "lucide-react"

import { CardDescription } from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const SkillInfoPopover = () => {
  return (
    <Popover>
      <PopoverTrigger className="text-muted-foreground hover:text-foreground hidden disabled:opacity-50 sm:flex">
        <CircleHelp className="size-3.5" />
        <span className="sr-only">Skill description</span>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        sideOffset={20}
        className="space-y-3 rounded-lg text-sm"
      >
        <CardDescription className="space-y-2.5 text-balance ps-2.5">
          <span>
            This list is only on tech tools, and skills that have a meaning full
            contribution in the last 3 quarters as of last update. Meaningful
            contribution means either of the following.
          </span>
          <ul className="grid grid-flow-row space-y-2.5 ps-2.5">
            <li>Activity at work if applies</li>
            <li>Merge with main branch or pull request in oss if applies</li>
            <li>Showcase in vlog, blog, feed if applies</li>
            <li>
              Milestone achieved, i.e public recognition, award etc if applies
            </li>
          </ul>
        </CardDescription>
      </PopoverContent>
    </Popover>
  )
}

export default SkillInfoPopover
