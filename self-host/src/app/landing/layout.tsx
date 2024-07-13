import type { ReactNode } from "react"
import { Suspense } from "react"

const Layout = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  return <Suspense fallback={<p>Loading feed...</p>}>{children}</Suspense>
}

export default Layout
