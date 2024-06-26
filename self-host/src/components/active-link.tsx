/*
 * This file contains code adapted from the Node.js website repository,
 * available at: https://github.com/nodejs/nodejs.org
 * The original code is licensed under the MIT License.
 */

"use client"

import type { ComponentProps, FC } from "react"
import { usePathname } from "next/navigation"

import cn from "@/lib/utils/cn"

import Link from "./link"

type ActiveLocalizedLinkProps = ComponentProps<typeof Link> & {
  activeClassName?: string
  allowSubPath?: boolean
}

const ActiveLink: FC<ActiveLocalizedLinkProps> = ({
  children,
  activeClassName = "text-white opacity-50",
  allowSubPath = false,
  className,
  href = "",
  ...props
}) => {
  const pathname = usePathname()

  const finalClassName = cn(className, {
    [activeClassName]: allowSubPath
      ? // When using allowSubPath we want only to check if
        // the current pathname starts with the utmost upper level
        // of an href (e.g. /docs/...)
        pathname.startsWith(`/${href.toString().split("/")[1]}`)
      : href.toString() === pathname,
  })

  return (
    <Link className={finalClassName} href={href} {...props}>
      {children}
    </Link>
  )
}

export default ActiveLink
