"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { NextUIProvider } from "@nextui-org/react"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </NextThemesProvider>
  );
}

