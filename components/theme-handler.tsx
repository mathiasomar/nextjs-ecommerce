"use client";

import { useEffect } from "react";

export default function ThemeHandler({
  theme,
  children,
}: {
  theme?: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    // If a theme prop is provided, set it. Otherwise do not override
    // the theme already set by the inline ThemeInit script.
    if (!theme) return;

    document.documentElement.className = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return <>{children}</>;
}
