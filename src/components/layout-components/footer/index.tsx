/*
 * This file contains code adapted from the Node.js website repository,
 * available at: https://github.com/nodejs/nodejs.org
 * The original code is licensed under the MIT License.
 */

import type { FC, SVGProps } from "react";

import { Icons } from "@/components/icons";
import { siteNavConfig } from "@/config";
import NavItem from "../nav-item";

const footerSocialIcons: Record<string, React.FC<SVGProps<SVGSVGElement>>> = {
  github: Icons.gitHub,
  youtube: Icons.youtube,
  Linkedin: Icons.linkedin,
  linkedin: Icons.buymeCoffee,
};

const Footer: FC = () => {
  const openJSlink = siteNavConfig.footerLinks.at(-1)!;

  return (
    <footer className="flex flex-col items-center gap-6 border-t border-neutral-200 bg-white py-4 dark:border-neutral-900 dark:bg-neutral-950 sm:px-8 md:flex-row md:justify-between md:py-5">
      <div className="flex flex-wrap content-start items-center justify-center gap-1 self-stretch">
        {siteNavConfig.footerLinks.slice(0, -1).map((item) => (
          <NavItem
            type="footer"
            className="whitespace-nowrap"
            href={item.link}
            key={item.link}
          >
            {item.text}
          </NavItem>
        ))}
      </div>

      <div className="flex flex-col items-center gap-1 md:flex-row">
        <NavItem type="footer" href={openJSlink.link}>
          &copy; {openJSlink.text}
        </NavItem>

        <div className="flex items-center gap-1">
          {siteNavConfig.socialLinks.map((link) => {
            const SocialIcon = footerSocialIcons[link.icon];

            return (
              <NavItem key={link.icon} href={link.link} type="footer">
                <SocialIcon width={20} height={20} aria-label={link.link} />
              </NavItem>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
