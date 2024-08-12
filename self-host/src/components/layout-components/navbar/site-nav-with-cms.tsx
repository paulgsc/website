import type { RequiredAccess, RoleWithAllAccess } from "@/types/auth/roles"
import { createCMSComponent } from "@/components/withCMS"

import SiteNav from "./site-nav"

const superuserOnly: Array<RoleWithAllAccess<Array<RequiredAccess<"hidden">>>> =
  ["superuser"]

const AuthorizedSiteNav = createCMSComponent(superuserOnly, SiteNav)

export default AuthorizedSiteNav
