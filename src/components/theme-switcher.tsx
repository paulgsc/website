"use client";

import * as React from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import { useConfigStore } from "@/hooks";

export function ThemeSwitcher() {
  const config = useConfigStore();
  const segment = useSelectedLayoutSegment();

  React.useEffect(() => {
    document.body.classList.forEach((className) => {
      if (className.match(/^theme.*/)) {
        document.body.classList.remove(className);
      }
    });

    const theme = segment === "themes" ? config.theme : null;
    if (theme) {
      return document.body.classList.add(`theme-${theme}`);
    }
  }, [segment, config]);

  return null;
}
