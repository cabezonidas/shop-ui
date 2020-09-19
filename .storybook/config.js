import * as React from "react";
import { configure, addDecorator } from "@storybook/react";
import { UiProvider } from "../src/theme/ui-provider";
import { useDarkMode } from "storybook-dark-mode";
import { addParameters } from "@storybook/react";
import "../assets/style.css";
import "@reach/dialog/styles.css";
import "@reach/combobox/styles.css";
import "@reach/menu-button/styles.css";
import "highlight.js/styles/default.css";

import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { Settings } from "luxon";

const languages = [
  { localeId: "es-AR", name: "Español (argentino)" },
  { localeId: "en-US", name: "English (USA)" },
];

const defaultLng = languages[0].localeId;

const resources = languages.reduce((res, language) => {
  if (language.localeId) {
    res[language.localeId] = { translation: {} };
  }
  return res;
}, {});

Settings.defaultLocale = defaultLng;

i18next.use(initReactI18next).init({
  resources,
  lng: defaultLng,
  fallbackLng: defaultLng,
});
const req = require.context("../src", true, /\.stories\.(ts|tsx)$/);

configure(() => {
  addParameters({
    darkMode: {
      // Set the initial theme
      current: "light",
    },
  });
  addDecorator(story => <UiProvider mode={useDarkMode() ? "dark" : "light"}>{story()}</UiProvider>);
  req.keys().forEach(filename => req(filename));
}, module);
