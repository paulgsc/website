"use client"

import Link from "next/link"
import { navMenuData } from "@/config"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Icons } from "@/components/icons"

import ListItem from "./nav-list-item"

const MainNavigationMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              About
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.8fr_1fr]">
              <li className="row-span-3">
                <article className="mx-auto grid h-full p-0.5 lg:grid-rows-[.2fr_1fr]">
                  <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                    Flagship - ShelfSight
                  </h5>

                  <div className="mx-auto flex h-full flex-col items-end justify-center text-balance">
                    <p className="text-muted-foreground mb-4 text-ellipsis break-words text-sm leading-tight tracking-wide">
                      ShelfSight: Cycle counting grocery items using Computer
                      vision and barcode detection.
                    </p>
                    <NavigationMenuLink asChild>
                      <a
                        href="#"
                        className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground inline-flex items-center rounded-sm px-3 py-2 text-center text-xs font-medium text-cyan-500 no-underline outline-none transition-colors"
                      >
                        Read more
                        <Icons.arrowRight />
                      </a>
                    </NavigationMenuLink>
                  </div>
                </article>
              </li>
              <ListItem href="/docs" title="Leafiproperties">
                Market place to trade shares of real estate properties.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Freelancing</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {navMenuData.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/blog" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Blog
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Static site
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Docs
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default MainNavigationMenu
