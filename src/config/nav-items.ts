import { MainNavItem, SidebarNavItem } from "../../types";

interface SiteNavConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const siteNavConfig: SiteNavConfig = {
  mainNav: [
    {
      title: "GitHub",
      href: "https://github.com/paulgsc",
      external: true,
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },
      ],
    },
  ],
};
