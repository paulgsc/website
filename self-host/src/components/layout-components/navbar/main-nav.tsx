"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

import MainNavigationMenu from "./main-nav-menu"

type NavLink = {
  href: string
  label: string
}

const navLinks: Array<NavLink> = []

const MainNav = () => {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="size-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <MainNavigationMenu />
      <nav className="flex items-center gap-6 text-sm">
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "hover:text-foreground/80 transition-colors",
              pathname === href || pathname?.startsWith(href)
                ? "text-foreground"
                : "text-foreground/60"
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default MainNav
