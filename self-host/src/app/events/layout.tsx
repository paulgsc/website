import { Fragment, type ReactNode } from "react"
import type { Metadata } from "next"
import { constructMetadata } from "@/lib"

import { RequiredAccess, RoleWithAllAccess } from "@/types/auth/roles"
import WithRedirect from "@/components/ui/with-redirect"
import { createCMSComponent } from "@/components/withCMS"

export const metadata: Metadata = constructMetadata({
  title: "Calendar events",
  description: "Events I'm holding - Come join us!",
})

const requiredRoles: Array<RoleWithAllAccess<Array<RequiredAccess<"hidden">>>> =
  ["superuser"]

const CMSRedirect = createCMSComponent(requiredRoles, Fragment, WithRedirect)

const Layout = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  return (
    <main className="absolute inset-0 flex flex-col items-center justify-center bg-red-500">
      {children}
      <CMSRedirect />
    </main>
  )
}

export default Layout
