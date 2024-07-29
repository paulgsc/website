import type { NextRequest, NextResponse } from "next/server"

import "server-only"

import type { JWTRoleRequiredAction } from "@/types/auth/roles"

import {
  deleteJwtCookie,
  generateJWT,
  generateJwtPayload,
  getValidRoleAcessPair,
  getValidRoleFromParam,
  setJwtCookie,
} from "./jwt"

// eslint-disable-next-line no-unused-vars
type FunctionWithArgs<T extends Array<unknown>, R> = (...args: T) => R

// Generalized pipe function
export function pipe<T extends Array<unknown>, R>(fn: FunctionWithArgs<T, R>) {
  function run(...args: T): R {
    return fn(...args)
  }

  run.pipe = <P>(fn2: FunctionWithArgs<[R], P>) =>
    pipe(((...args: T) => fn2(fn(...args))) as FunctionWithArgs<T, P>)

  return run
}

export async function applyJwtCookieAction<
  T extends NextRequest,
  P extends NextResponse,
>(request: T, response: P, action: JWTRoleRequiredAction): Promise<void> {
  switch (action) {
    case "keep":
      break
    case "reset": {
      const resetJwt = pipe(deleteJwtCookie)
        .pipe(() => getValidRoleFromParam(request))
        .pipe((role) => getValidRoleAcessPair(role))
        .pipe((access) => generateJwtPayload(access))
        .pipe(async (payload) => await generateJWT(payload))
        .pipe(
          async (token) =>
            await setJwtCookie(response, "jwt_token_for_role", token)
        )

      await resetJwt(response, "jwt_token_for_role")
      break
    }
    case "new": {
      const setJwt = pipe(getValidRoleFromParam)
        .pipe((role) => getValidRoleAcessPair(role))
        .pipe((access) => generateJwtPayload(access))
        .pipe(async (payload) => await generateJWT(payload))
        .pipe(
          async (token) =>
            await setJwtCookie(response, "jwt_token_for_role", token)
        )
      await setJwt(request)
      break
    }
    default:
      throw new Error(`Action '${action}' is not known`)
  }

  return
}
