import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { TableHead } from "@/components/ui/table"

type ControlHeaderType = {
  title: string
  descr: string
  className: string
}

const controlHeader: Array<ControlHeaderType> = [
  {
    title: "name",
    descr: "title",
    className: "w-[100px]",
  },
  {
    title: "level",
    descr: "measure of aptitude based on elo",
    className: "w-[100px]",
  },
  {
    title: "target",
    descr: "benchmark elo that correlates with mastery",
    className: "w-[100px]",
  },
  {
    title: "quarter",
    descr: "three-month period based on Jan start of yr.",
    className: "w-[100px]",
  },
] as const

const ControlHeader = () => {
  return (
    <>
      {controlHeader.map((header) => (
        <TableHead key={header.title} className=" w-[100px]">
          <HoverCard>
            <HoverCardTrigger>
              <h6 className=" hover:bg-muted/40 size-fit rounded-md p-1.5 capitalize tracking-tight transition-colors">
                {header.title}
              </h6>
            </HoverCardTrigger>
            <HoverCardContent>{header.descr}</HoverCardContent>
          </HoverCard>
        </TableHead>
      ))}
    </>
  )
}

export default ControlHeader
