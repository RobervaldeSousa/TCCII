
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("pertodaki_theme");

    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }

    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", theme === "dark");

    localStorage.setItem("pertodaki_theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light",
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme deve ser utilizado dentro de ThemeProvider");
  }

  return context;
}
