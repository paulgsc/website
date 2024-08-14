import { Fragment, type ReactNode } from "react"

import { RequiredAccess, RoleWithAllAccess } from "@/types/auth/roles"
import WithRedirect from "@/components/ui/with-redirect"
import { createCMSComponent } from "@/components/withCMS"

const requiredRoles: Array<RoleWithAllAccess<Array<RequiredAccess<"hidden">>>> =
  ["superuser"]

const CMSRedirect = createCMSComponent(requiredRoles, Fragment, WithRedirect)

const Layout = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  return (
    <div className="mb-0.5 mt-1.5">
      {children}
      <CMSRedirect />
    </div>
  )
}

export default Layout
