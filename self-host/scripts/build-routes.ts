import fs from "fs"
import path from "path"
import type { SiteAppRoutes } from "@/types"

/*
 * Constants
 */
const OUTPUT_DIR = "./routes.constants.config.json"
const appDir = path.join(process.cwd(), "src/app")
const contentDir = path.join(process.cwd(), "src/content")

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

function getMdxTitle(filePath: string): string {
  // Read the first few lines of the file to extract the title
  // This is a simple implementation. You might need to adjust it based on your MDX structure
  const content = fs
    .readFileSync(filePath, "utf8")
    .split("\n")
    .slice(0, 10)
    .join("\n")
  const titleMatch = content.match(/title:\s*["'](.+)["']/)
  return titleMatch ? titleMatch[1] : path.basename(filePath, ".mdx")
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
      routes.push({
        title: getMdxTitle(fullPath),
        href: `${baseRoute}/${path.basename(item, ".mdx")}`,
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
      if (hasPageFile(fullPath)) {
        const routePath = generateRoutePath(fullPath)
        if (item === "(markdown)") {
          // For markdown routes, traverse the content directory
          const markdownRoutes = traverseContentDirectory(contentDir, "")
          navItems.push(...markdownRoutes)
        } else if (item.includes("[[...slug]]")) {
          // For dynamic routes, we'll keep the structure but note it's dynamic
          navItems.push({
            title: "Dynamic Route",
            href: routePath,
          })
        } else {
          navItems.push({
            title: item,
            href: routePath,
          })
        }
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

  console.log(
    `Routes configuration has been generated and saved to ${OUTPUT_DIR}`
  )
}

generateDocsConfig()
