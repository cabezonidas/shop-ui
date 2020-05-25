import * as React from "react";
import { FC, Suspense } from "react";
import { ThemeProvider } from "emotion-theming";
import { theme } from "./theme";
import { TranslationProvider } from "../internationalization/translation-provider";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { Global, css } from "@emotion/core";
import { useTheme } from "./use-theme";
import { ToastProvider } from "./toast/toast";
import { DarkModeState, DarkModeContext } from "./dark-mode";

i18next.use(initReactI18next).init({
  resources: {
    "en-US": { translation: {} },
    "es-AR": { translation: {} },
  },
  lng: "en-US",
  fallbackLng: "en-US",
});

export const UiProvider: FC<{ suspense?: boolean; mode?: "dark" | "light" }> = props => {
  const { children, suspense, mode } = props;
  const provider = (
    <TranslationProvider>
      <DarkModeState mode={mode}>
        <DarkModeContext.Consumer>
          {({ themeMode }) => (
            <ThemeProvider theme={{ ...theme, mode: themeMode }}>
              <GlobalStyle />
              <ToastProvider>{children}</ToastProvider>
            </ThemeProvider>
          )}
        </DarkModeContext.Consumer>
      </DarkModeState>
    </TranslationProvider>
  );

  if (suspense === false) {
    return provider;
  }
  return <Suspense fallback={<></>}>{provider}</Suspense>;
};

export default UiProvider;

const GlobalStyle = () => {
  const {
    colors: { neutral },
    mode,
  } = useTheme();
  return (
    <Global
      styles={css`
        body {
          color: ${mode === "dark" ? neutral.lightest : neutral.darkest};
          background-color: ${mode === "dark" ? neutral.darkest : neutral.lightest};
        }
      `}
    />
  );
};
