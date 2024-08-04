import type { HTMLAttributeAnchorTarget } from "react"

import type { ValidUrlOrLocalRoute } from "./url-types"

interface NavigationLink {
  link: ValidUrlOrLocalRoute
  label: string
  target?: string
}

interface SocialLink {
  icon: string
  link: ValidUrlOrLocalRoute
  alt: string
}

interface FooterLink {
  link: ValidUrlOrLocalRoute
  text: string
  target?: HTMLAttributeAnchorTarget
}

interface SideNavigationItem {
  label: string
  items: Record<string, NavigationLink>
}

type SideNavigation = Record<string, SideNavigationItem>

export interface NavigationConfig {
  topNavigation: Record<string, NavigationLink>
  footerLinks: Array<FooterLink>
  socialLinks: Array<SocialLink>
  sideNavigation: SideNavigation
}

export type SiteAppRoutes = {
  title: string
  href: string
}
