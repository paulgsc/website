/*
 * This file contains code adapted from the Node.js website repository,
 * available at: https://github.com/nodejs/nodejs.org
 * The original code is licensed under the MIT License.
 */

import type { FC, HTMLAttributeAnchorTarget, PropsWithChildren } from "react"

import { cn } from "@/lib/utils"
import ActiveLink from "@/components/active-link"
import { Icons } from "@/components/icons"

type NavItemType = "nav" | "footer"

type NavItemProps = {
  href: string
  type?: NavItemType
  className?: string
  target?: HTMLAttributeAnchorTarget | undefined
  showExt?: boolean
}

const NavLink: FC<PropsWithChildren<NavItemProps>> = ({
  href = "",
  children,
  className,
  target,
  showExt = true,
}) => (
  <ActiveLink
    href={href}
    className={cn(
      "inline-flex items-center gap-2 rounded px-3 py-2 dark:text-white",
      className
    )}
    allowSubPath={href.startsWith("/")}
    target={target}
  >
    {children}

    {(href.startsWith("http") || target === "_blank") && showExt && (
      <Icons.externalLink className=" text-foreground pointer-events-none size-3 opacity-50 dark:text-white" />
    )}
  </ActiveLink>
)

export default NavLink
