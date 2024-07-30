import { getCookie } from "cookies-next"
import { create } from "zustand"

import type {
  JWTCookeSessionKeys,
  UserRoleJWTPayload,
} from "@/types/auth/roles"
import { decodeJwtPayload } from "@/lib/auth/client"

interface AuthState {
  userRolePayload: UserRoleJWTPayload | null
  // eslint-disable-next-line no-unused-vars
  setUserRolePayload: (userRolePayload: UserRoleJWTPayload) => void
  loadUserRolePayload: () => void
}

// Create the Zustand store
export const useAuthStore = create<AuthState>((set) => ({
  userRolePayload: null,
  setUserRolePayload: (userRolePayload) => set({ userRolePayload }),
  loadUserRolePayload: () => {
    const jwt_token_for_role: JWTCookeSessionKeys = "jwt_token_for_role"
    const token = getCookie(jwt_token_for_role) // Retrieve JWT token from cookies
    if (token && typeof token === "string") {
      try {
        const payload = decodeJwtPayload(token)
        set({ userRolePayload: payload })
      } catch (error) {
        console.error("Failed to decode JWT payload:", error)
        set({ userRolePayload: null })
      }
    } else {
      set({ userRolePayload: null })
    }
  },
}))
