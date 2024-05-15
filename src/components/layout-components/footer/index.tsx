/*
 * This file contains code adapted from the Node.js website repository,
 * available at: https://github.com/nodejs/nodejs.org
 * The original code is licensed under the MIT License.
 */

import type { FC, SVGProps } from "react";

import { siteNavigation } from "@/next.json.mjs";
import { Icons } from "@/components/icons";
import styles from "./index.module.css";
import NavItem from "../nav-item";

const footerSocialIcons: Record<string, React.FC<SVGProps<SVGSVGElement>>> = {
  github: Icons.gitHub,
  youtube: Icons.youtube,
  Linkedin: Icons.linkedin,
  linkedin: Icons.buymeCoffee,
};

const Footer: FC = () => {
  const openJSlink = siteNavigation.footerLinks.at(-1)!;

  return (
    <footer className="flex flex-col items-center gap-6 border-t border-neutral-200 bg-white py-4 dark:border-neutral-900 dark:bg-neutral-950 sm:px-8 md:flex-row md:justify-between md:py-5">
      <div className={styles.sectionPrimary}>
        {siteNavigation.footerLinks.slice(0, -1).map((item) => (
          <NavItem type="footer" href={item.link} key={item.link}>
            {item.text}
          </NavItem>
        ))}
      </div>

      <div className={styles.sectionSecondary}>
        <NavItem type="footer" href={openJSlink.link}>
          &copy; {openJSlink.text}
        </NavItem>

        <div className={styles.social}>
          {siteNavigation.socialLinks.map((link) => {
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
