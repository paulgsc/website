import fs from "fs"
import path from "path"
import type { SiteAppRoutes } from "@/types"

import { isEnclosedWithBrackets, isEnclosedWithParentheses } from "@/lib/utils"

/*
 * Constants
 */
const OUTPUT_DIR = "./routes.constants.config.json"
const appDir = path.join(process.cwd(), "src/app")
const contentDir = path.join(process.cwd(), "src/content/pages")

function isDirectory(path: string) {
  return fs.statSync(path).isDirectory()
}

function hasPageFile(dir: string) {
  return fs.existsSync(path.join(dir, "page.tsx"))
}

function generateRoutePath(dir: string) {
  const relativePath = path.relative(appDir, dir)
  return relativePath.split(path.sep).join("/")
}

function getMdxTitle(filePath: string): string {
  const content = fs
    .readFileSync(filePath, "utf8")
    .split("\n")
    .slice(0, 10)
    .join("\n")
  const titleMatch = content.match(/title:\s*["'](.+)["']/)
  return titleMatch ? titleMatch[1] : path.basename(filePath, ".mdx")
}

function normalizeHref(href: string): string {
  href = href.startsWith("/") ? href : `/${href}`
  return href.endsWith("/index") ? href.slice(0, -6) : href
}

function traverseContentDirectory(
  dir: string,
  baseRoute: string
): Array<SiteAppRoutes> {
  const items = fs.readdirSync(dir)
  const routes: Array<SiteAppRoutes> = []

  for (const item of items) {
    const fullPath = path.join(dir, item)
    if (isDirectory(fullPath)) {
      routes.push(...traverseContentDirectory(fullPath, `${baseRoute}/${item}`))
    } else if (path.extname(item) === ".mdx") {
      const baseName = path.basename(item, ".mdx")
      const href = normalizeHref(
        `${baseRoute}/${baseName === "index" ? "" : baseName}`
      )
      routes.push({
        title: getMdxTitle(fullPath),
        href: href,
      })
    }
  }

  return routes
}

function traverseDirectory(
  dir: string,
  navItems: Array<SiteAppRoutes> = []
): Array<SiteAppRoutes> {
  const items = fs.readdirSync(dir)

  for (const item of items) {
    const fullPath = path.join(dir, item)

    if (isDirectory(fullPath)) {
      if (fullPath.includes("(markdown)")) {
        const isNotSlugRoute = !isEnclosedWithBrackets(item)
        const isNotGroupRoute = !isEnclosedWithParentheses(item)

        if (isNotSlugRoute && isNotGroupRoute) {
          const contentPath = path.join(contentDir, item)
          if (fs.existsSync(contentPath)) {
            const markdownRoutes = traverseContentDirectory(contentPath, item)
            navItems.push(...markdownRoutes)
          }
        }
      } else if (hasPageFile(fullPath)) {
        const routePath = generateRoutePath(fullPath)
        navItems.push({
          title: item,
          href: normalizeHref(routePath),
        })
      }

      // Recursively traverse subdirectories
      const subNavItems = traverseDirectory(fullPath)
      navItems.push(...subNavItems)
    }
  }

  return navItems
}

function generateDocsConfig() {
  const routesConfig = traverseDirectory(appDir)

  // Remove duplicates
  const uniqueRoutes = routesConfig.filter(
    (route, index, self) =>
      index === self.findIndex((t) => t.href === route.href)
  )

  fs.writeFileSync(
    path.join(process.cwd(), OUTPUT_DIR),
    JSON.stringify(uniqueRoutes, null, 2)
  )

  console.log(
    `Routes configuration has been generated and saved to ${OUTPUT_DIR}`
  )
}

generateDocsConfig()
