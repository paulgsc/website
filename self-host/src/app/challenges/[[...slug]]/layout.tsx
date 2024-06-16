import type { ReactNode } from "react"
import type { Metadata } from "next"
import { Red_Hat_Text } from "next/font/google"
import { constructMetadata } from "@/lib"

export const metadata: Metadata = constructMetadata({
  title: "Projects",
  description: "My spaghetti monster",
})

const redHat = Red_Hat_Text({ subsets: ["latin"], weight: "700" })

const Layout = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  return <div className={redHat.className}>{children}</div>
}

export default Layout
