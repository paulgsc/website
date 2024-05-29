/*
 * This file contains code adapted from the Node.js website repository,
 * available at: https://github.com/nodejs/nodejs.org
 * The original code is licensed under the MIT License.
 */

import type { FC } from "react"
import { siteNavConfig } from "@/config"
import type { IconProps } from "@/types"

import { Icons } from "@/components/icons"

import { default as NavItem, default as NavLink } from "./nav-link"

type SocialIconProps = {
  classname: string
  // eslint-disable-next-line no-undef
  icon: React.FC<IconProps>
}
const footerSocialIcons: Record<string, SocialIconProps> = {
  github: {
    icon: Icons.gitHub,
    classname: "h-4 w-4 text-black",
  },
  youtube: {
    icon: Icons.youtube,
    classname: "w-7 h-7 text-red-600",
  },
  twitter: {
    icon: Icons.twitter,
    classname: "w-3 h-3",
  },
}

const Footer: FC = () => {
  const openJSlink = siteNavConfig.footerLinks.at(-1)!

  return (
    <footer className="bg-muted sticky bottom-0 flex w-full grow-0 items-center justify-between border border-neutral-200 py-2.5  pe-2.5 ps-2.5 dark:border-neutral-900 dark:bg-neutral-950">
      <div className="flex flex-wrap content-start items-center justify-center gap-1 self-stretch">
        {siteNavConfig.footerLinks.map((item) => (
          <NavLink
            type="footer"
            className="whitespace-nowrap capitalize tracking-tight text-black hover:bg-gray-100/80"
            href={item.link}
            key={item.link}
            target="_blank"
          >
            <span className="text-muted-foreground text-sm font-medium leading-5">
              {item.text}
            </span>
          </NavLink>
        ))}
      </div>

      <div className="flex flex-col items-center gap-1 md:flex-row">
        {Array.isArray(openJSlink) && (
          <NavItem type="footer" href={openJSlink.link}>
            &copy; {openJSlink.text}
          </NavItem>
        )}

        <div className="flex items-center gap-1">
          {siteNavConfig.socialLinks.map((social) => {
            const SocialIcon = footerSocialIcons[social.icon].icon
            const className = footerSocialIcons[social.icon].classname

            return (
              <NavItem
                key={social.icon}
                href={social.link}
                target="_blank"
                type="footer"
                showExt={false}
              >
                <SocialIcon className={className} aria-label={social.link} />
              </NavItem>
            )
          })}
        </div>
      </div>
    </footer>
  )
}

export default Footer
