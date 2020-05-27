import * as React from "react";

interface IDarkModeState {
  setThemeMode: React.Dispatch<React.SetStateAction<"dark" | "light">>;
  themeMode: "dark" | "light";
}

export const DarkModeContext = React.createContext<IDarkModeState>(undefined as any);
export const useDarkMode = () => {
  const { setThemeMode } = React.useContext(DarkModeContext);
  return { setThemeMode };
};

export const DarkModeState: React.FC<{ mode?: "dark" | "light" }> = ({ mode, children }) => {
  const [themeMode, setThemeMode] = React.useState<"dark" | "light">(mode ?? "dark");
  React.useEffect(() => {
    if (mode) {
      setThemeMode(mode);
    }
  }, [mode]);
  return (
    <DarkModeContext.Provider value={{ setThemeMode, themeMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
