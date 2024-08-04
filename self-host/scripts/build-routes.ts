import fs from "fs"
import path from "path"
import type { SiteAppRoutes } from "@/types"

/*
 * Constants
 */

const OUTPUT_DIR = "./routes.constants.config.json"

const appDir = path.join(process.cwd(), "src/app")

function isDirectory(path: string) {
  return fs.statSync(path).isDirectory()
}

function hasPageFile(dir: string) {
  return fs.existsSync(path.join(dir, "page.tsx"))
}

function generateRoutePath(dir: string) {
  const relativePath = path.relative(appDir, dir)
  return "/" + relativePath.split(path.sep).join("/")
}

function traverseDirectory(dir: string, navItems: Array<SiteAppRoutes> = []) {
  const items = fs.readdirSync(dir)

  for (const item of items) {
    const fullPath = path.join(dir, item)

    if (isDirectory(fullPath)) {
      if (hasPageFile(fullPath)) {
        const routePath = generateRoutePath(fullPath)
        navItems.push({
          title: path.basename(fullPath),
          href: routePath,
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

  fs.writeFileSync(
    path.join(process.cwd(), OUTPUT_DIR),
    JSON.stringify(routesConfig, null, 2)
  )
}

generateDocsConfig()
