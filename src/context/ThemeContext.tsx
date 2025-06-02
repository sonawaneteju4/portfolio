import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

// --- update ThemeContext to support setTheme ---
export type Theme = "light" | "dark" | "system";

// Context shape
interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as Theme) || "light";
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      document.documentElement.classList.add(systemTheme);
    } else {
      document.documentElement.classList.add(theme);
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) =>
      prev === "light" ? "dark" : prev === "dark" ? "system" : "light"
    );

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
};
