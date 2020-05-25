import { ITheme } from "./theme";
import { useContext } from "react";
import { ThemeContext } from "@emotion/core";
import { useDarkMode } from "./dark-mode";

export const useTheme = () => {
  const themeCtx = useContext(ThemeContext) as ITheme;
  const { setThemeMode } = useDarkMode();
  return { ...themeCtx, setThemeMode };
};
