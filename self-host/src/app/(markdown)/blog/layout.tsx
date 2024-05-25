import type { ReactNode } from "react"

const Layout = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  return <>{children}</>
}

export default Layout
