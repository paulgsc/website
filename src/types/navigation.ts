import { ValidUrlOrLocalRoute } from "./url-types";

interface NavigationLink {
  link: ValidUrlOrLocalRoute;
  label: string;
  target?: string;
}

interface SocialLink {
  icon: string;
  link: ValidUrlOrLocalRoute;
  alt: string;
}

interface FooterLink {
  link: ValidUrlOrLocalRoute;
  text: string;
}

interface SideNavigationItem {
  label: string;
  items: Record<string, NavigationLink>;
}

type SideNavigation = Record<string, SideNavigationItem>;

export interface Navigationonfig {
  topNavigation: Record<string, NavigationLink>;
  footerLinks: FooterLink[];
  socialLinks: SocialLink[];
  sideNavigation: SideNavigation;
}
