import type { ReactNode } from "react"
import type { Metadata } from "next"
import { constructMetadata } from "@/lib"

export const metadata: Metadata = constructMetadata({
  title: "Calendar events",
  description: "Events I'm holding - Come join us!",
})

const Layout = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  return (
    <main className="absolute inset-0 flex flex-col items-center bg-zinc-50">
      {children}
    </main>
  )
}

export default Layout
