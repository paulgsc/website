/*
 * This file contains code adapted from the Node.js website repository,
 * available at: https://github.com/nodejs/nodejs.org
 * The original code is licensed under the MIT License.
 */

import type { FC } from "react";

import { Icons } from "@/components/icons";
import { siteNavConfig } from "@/config";
import { IconProps } from "@/types";
import { default as NavItem, default as NavLink } from "./nav-link";

interface SocialIconProps {
  classname: string;
  icon: React.FC<IconProps>;
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
};

const Footer: FC = () => {
  const openJSlink = siteNavConfig.footerLinks.at(-1)!;

  return (
    <footer className="flex flex-col items-center gap-6 border-t border-neutral-200 bg-zinc-50 py-4 dark:border-neutral-900 dark:bg-neutral-950 sm:px-8 md:flex-row md:justify-between md:py-5">
      <div className="flex flex-wrap content-start items-center justify-center gap-1 self-stretch">
        {siteNavConfig.footerLinks.map((item) => (
          <NavLink
            type="footer"
            className="whitespace-nowrap capitalize tracking-tight text-black hover:bg-gray-100/80"
            href={item.link}
            key={item.link}
          >
            <span className="text-sm text-black font-medium leading-5">
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
            const SocialIcon = footerSocialIcons[social.icon].icon;
            const className = footerSocialIcons[social.icon].classname;

            return (
              <NavItem
                key={social.icon}
                href={social.link}
                type="footer"
                showExt={false}
              >
                <SocialIcon className={className} aria-label={social.link} />
              </NavItem>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
