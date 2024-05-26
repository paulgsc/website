import type { ReactNode } from "react"

const Layout = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  return <div className="mb-0.5 mt-1.5">{children}</div>
}

export default Layout
