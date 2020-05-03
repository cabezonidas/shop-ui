import * as React from "react";
import { FC, Suspense } from "react";
import { ThemeProvider } from "emotion-theming";
import { theme } from "./theme";
import { TranslationProvider } from "../internationalization/translation-provider";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

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
      <ThemeProvider theme={{ ...theme, mode }}>{children}</ThemeProvider>
    </TranslationProvider>
  );

  if (suspense === false) {
    return provider;
  }
  return <Suspense fallback={<></>}>{provider}</Suspense>;
};

export default UiProvider;
