import { useEffect, useState } from "react"

type Theme = "light" | "dark"

const themeStorageKey = "ev-mobility-theme"
const darkModeQuery = "(prefers-color-scheme: dark)"

function getSystemTheme(): Theme {
  return window.matchMedia?.(darkModeQuery).matches ? "dark" : "light"
}

function readStoredTheme(): Theme | null {
  try {
    const storedTheme = localStorage.getItem(themeStorageKey)

    return storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : null
  } catch {
    return null
  }
}

function writeStoredTheme(theme: Theme) {
  try {
    localStorage.setItem(themeStorageKey, theme)
  } catch {
    // Ignore storage failures so private or restricted browser contexts still work.
  }
}

function getInitialTheme(): Theme {
  return readStoredTheme() ?? getSystemTheme()
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark")
  document.documentElement.style.colorScheme = theme
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    if (readStoredTheme()) {
      return
    }

    const mediaQuery = window.matchMedia?.(darkModeQuery)

    if (!mediaQuery) {
      return
    }

    const handleSystemThemeChange = () => setTheme(getSystemTheme())

    mediaQuery.addEventListener("change", handleSystemThemeChange)

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange)
    }
  }, [])

  const toggleTheme = () => {
    setTheme((current) => {
      const nextTheme = current === "dark" ? "light" : "dark"

      writeStoredTheme(nextTheme)

      return nextTheme
    })
  }

  return { theme, toggleTheme }
}
