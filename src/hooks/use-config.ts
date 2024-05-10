import { create } from "zustand";
import { Style, Theme } from "../../types";

type Config = {
  style: Style["name"];
  theme: Theme["name"];
  radius: number;
};

const initialConfig: Config = {
  style: "new-york",
  theme: "zinc",
  radius: 0.5,
};

export const useConfigStore = create<Config>((set) => ({
  ...initialConfig,
  setStyle: (style: Style["name"]) => set((state) => ({ ...state, style })),
  setTheme: (theme: Theme["name"]) => set((state) => ({ ...state, theme })),
  setRadius: (radius: number) => set((state) => ({ ...state, radius })),
}));
