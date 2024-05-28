import type { NavigationConfig } from "@/types"

import { siteConfig } from "./site"

export const siteNavConfig: NavigationConfig = {
  topNavigation: {
    docs: {
      link: "docs",
      label: "components.containers.navBar.links.docs",
      target: "_blank",
    },
  },
  footerLinks: [
    {
      link: "/about/meet-the-creator",
      text: "meet the creator",
    },
    {
      link: "https://www.freeprivacypolicy.com/live/d10d93fb-0516-4a88-8194-4fff1b7e21c3",
      text: "privacy policy",
    },
  ],
  socialLinks: [
    {
      icon: "github",
      link: siteConfig.links.github,
      alt: "GitHub",
    },
    {
      icon: "twitter",
      link: siteConfig.links.twitter,
      alt: "Twitter",
    },
    {
      icon: "youtube",
      link: siteConfig.links.youtube,
      alt: "Youtube",
    },
  ],
  sideNavigation: {
    about: {
      label: "components.navigation.about.links.about",
      items: {
        about: {
          link: "/about",
          label: "components.navigation.about.links.aboutSide",
        },
        branding: {
          link: "/about/branding",
          label: "components.navigation.about.links.branding",
        },
        governance: {
          link: "/about/governance",
          label: "components.navigation.about.links.governance",
        },
        releases: {
          link: "/about/previous-releases",
          label: "components.navigation.about.links.releases",
        },
        security: {
          link: "/about/security-reporting",
          label: "components.navigation.about.links.security",
        },
      },
    },
  },
}
