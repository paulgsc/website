import type { ComponentProps, FC, PropsWithChildren, ReactNode } from "react"

import { cn } from "@/lib/utils"
import type { BadgeProps } from "@/components/ui/badge"
import { Badge, badgeVariants } from "@/components/ui/badge"
import { Icons } from "@/components/icons"
import Link from "@/components/link"

type SharedBadgeProps = {
  badgeText?: ReactNode
  badgeVariant?: Pick<BadgeProps, "variant">["variant"]
  badgeClassname?: string
} & ComponentProps<typeof Link> &
  Pick<BadgeProps, "variant">

const SharedBadge: FC<PropsWithChildren<SharedBadgeProps>> = ({
  variant = "accent",
  badgeVariant = "default",
  badgeText,
  children,
  ...args
}) => (
  <Link
    className={cn(
      "flex w-fit items-center truncate rounded-full border py-1 pl-1 pr-2.5 text-sm font-medium",
      badgeVariants({ variant: variant })
    )}
    {...args}
  >
    {badgeText && (
      <Badge variant={badgeVariant} className="border-none p-0 pr-0.5">
        {badgeText}
      </Badge>
    )}
    <span>{children}</span>
    {args.href && <Icons.arrowRight className="size-3" />}
  </Link>
)

export default SharedBadge
