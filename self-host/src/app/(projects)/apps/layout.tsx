import { Fragment, type ReactNode } from "react"
import type { Metadata } from "next"
import { constructMetadata } from "@/lib"

import { RequiredAccess, RoleWithAllAccess } from "@/types/auth/roles"
import WithRedirect from "@/components/ui/with-redirect"
import { createCMSComponent } from "@/components/withCMS"

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  return constructMetadata({
    title: `App - ${params.slug}`,
    description: `Live app demo for ${params.slug}`,
  })
}

const requiredRoles: Array<RoleWithAllAccess<Array<RequiredAccess<"hidden">>>> =
  ["superuser"]

const CMSRedirect = createCMSComponent(requiredRoles, Fragment, WithRedirect)

const Layout = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  return (
    <>
      {children}
      <CMSRedirect />
    </>
  )
}

export default Layout
