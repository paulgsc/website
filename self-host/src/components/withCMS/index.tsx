import type { ComponentType, FC, ReactNode } from "react"
import { cookies } from "next/headers"

import type { AppUserRole, JWTCookeSessionKeys } from "@/types/auth/roles"
import { getValidRoleFromToken } from "@/lib/auth/jwt"
import { pipe } from "@/lib/auth/role"

type CMSComponent = {
  getUserRole(): AppUserRole
  isAlive(): boolean
}

function createCMSComponent<P extends object>(
  requiredRoles: Array<AppUserRole>,
  WrappedComponent: ComponentType<P>,
  fallback: ReactNode
): FC<P> & CMSComponent {
  const Component: FC<P> & CMSComponent = (props: P) => {
    const isAlive = Component.isAlive!()
    const { ...componentProps } = props

    return isAlive ? <WrappedComponent {...(componentProps as P)} /> : fallback
  }

  Component.getUserRole = () => getUserRole()

  Component.isAlive = () => {
    const userRole = Component.getUserRole!()
    return userRole in requiredRoles
  }

  return Component
}

function getUserRole(): AppUserRole {
  const requiredAccess = pipe(getJwtCookie).pipe((token) =>
    getValidRoleFromToken(token)
  )

  return requiredAccess()
}

function getJwtCookie() {
  const jwt_token_for_role: JWTCookeSessionKeys = "jwt_token_for_role"
  const cookieStore = cookies()
  const jwtCookie = cookieStore.get(jwt_token_for_role)

  return jwtCookie?.value
}

export { createCMSComponent }
