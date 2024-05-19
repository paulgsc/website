import { Style, Theme } from "@/types"
import { create } from "zustand"

type Config = {
  style: Style["name"]
  theme: Theme["name"]
  radius: number
}

const initialConfig: Config = {
  style: "default",
  theme: "zinc",
  radius: 0.5,
}

export const useConfig = create<Config>((set) => ({
  ...initialConfig,
  setStyle: (style: Style["name"]) => set((state) => ({ ...state, style })),
  setTheme: (theme: Theme["name"]) => set((state) => ({ ...state, theme })),
  setRadius: (radius: number) => set((state) => ({ ...state, radius })),
}))
