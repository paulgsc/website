/*
 * This file contains code adapted from the Node.js website repository,
 * available at: https://github.com/nodejs/nodejs.org
 * The original code is licensed under the MIT License.
 */

import type { FC, HTMLAttributeAnchorTarget, PropsWithChildren } from "react";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import ActiveLink from "@/components/active-link";

type NavItemType = "nav" | "footer";

type NavItemProps = {
  href: string;
  type?: NavItemType;
  className?: string;
  target?: HTMLAttributeAnchorTarget | undefined;
};

const NavItem: FC<PropsWithChildren<NavItemProps>> = ({
  href = "",
  children,
  className,
  target,
}) => (
  <ActiveLink
    href={href}
    className={cn(
      "inline-flex items-center gap-2 rounded px-3 py-2",
      className
    )}
    allowSubPath={href.startsWith("/")}
    target={target}
  >
    <span className="text-sm font-medium leading-5 ">{children}</span>

    {(href.startsWith("http") || target === "_blank") && (
      <Icons.externalLink className="size-3 dark:text-neutral-200 text-white opacity-50" />
    )}
  </ActiveLink>
);

export default NavItem;
