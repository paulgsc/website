interface NavigationLink {
  link: string;
  label: string;
  target?: string;
}

interface SocialLink {
  icon: string;
  link: string;
  alt: string;
}

interface FooterLink {
  link: string;
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
