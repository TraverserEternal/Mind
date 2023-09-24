import { PropsWithChildren, createContext, useContext, useState } from "react";

export type Theme = {
  textColor: string;
  backgroundColor: string;
  buttonTextColor: string;
  buttonBackgroundColor: string;
  secondaryTextColor: string;
  isDark: boolean;
};

const purpleDarkMode: Theme = {
  textColor: "#CF9AD6",
  backgroundColor: "#211B22",
  secondaryTextColor: "#876E87",
  buttonBackgroundColor: "#CF9AD6",
  buttonTextColor: "#211B22",
  isDark: false,
};

const purpleLightMode: Theme = {
  textColor: "#211B22",
  backgroundColor: "#F6F4F6",
  secondaryTextColor: "#DAD2DB",
  buttonBackgroundColor: "#8A3792",
  buttonTextColor: "#F6F4F6",
  isDark: true,
};

const initialTheme = purpleDarkMode;

// Create a context for themes
const ThemesContext = createContext<
  | {
      theme: Theme;
      setTheme: (theme: Theme) => void;
    }
  | undefined
>(undefined);

// Create a provider component that holds the current theme and theme-changing function
export const ThemesProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  return (
    <ThemesContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemesContext.Provider>
  );
};

// Custom hook to access theme data and functions
export const useThemes = () => {
  const context = useContext(ThemesContext);
  if (!context) {
    throw new Error("useThemes must be used within a ThemesProvider");
  }
  return context;
};
