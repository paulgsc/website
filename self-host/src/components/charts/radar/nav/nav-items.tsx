import { Book, Bot, Code2, Settings2, SquareTerminal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const navItems = [
  {
    label: "Playground",
    icon: <SquareTerminal className="size-5" />,
    ariaLabel: "Playground",
    className: "bg-muted rounded-lg",
  },
  {
    label: "Models",
    icon: <Bot className="size-5" />,
    ariaLabel: "Models",
    className: "rounded-lg",
  },
  {
    label: "API",
    icon: <Code2 className="size-5" />,
    ariaLabel: "API",
    className: "rounded-lg",
  },
  {
    label: "Documentation",
    icon: <Book className="size-5" />,
    ariaLabel: "Documentation",
    className: "rounded-lg",
  },
  {
    label: "Settings",
    icon: <Settings2 className="size-5" />,
    ariaLabel: "Settings",
    className: "rounded-lg",
  },
] as const

const NavItems = () => {
  return (
    <nav className="grid gap-1 p-2 max-sm:grid-flow-col">
      {navItems.map((item, index) => (
        <Tooltip key={index}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={item.className}
              aria-label={item.ariaLabel}
            >
              {item.icon}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            {item.label}
          </TooltipContent>
        </Tooltip>
      ))}
    </nav>
  )
}

export default NavItems
