import { Fragment } from "react"

import { RequiredAccess, RoleWithAllAccess } from "@/types/auth/roles"
import { createCMSComponent } from "@/components/withCMS"
import PageTest from "@/app/test/page"

const requiredRoles: Array<
  RoleWithAllAccess<Array<RequiredAccess<"fundme" | "trial">>>
> = ["superuser", "subscriber", "github"]

const AuthorizedAutoplayTabs = createCMSComponent(requiredRoles, PageTest)

export default AuthorizedAutoplayTabs
