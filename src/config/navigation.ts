import { NavigationConfig } from "@/types";
import { siteConfig } from "./site";

export const siteNavConfig: NavigationConfig = {
  topNavigation: {
    docs: {
      link: "docs",
      label: "components.containers.navBar.links.docs",
      target: "_blank",
    },
  },
  footerLinks: [],
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
};
