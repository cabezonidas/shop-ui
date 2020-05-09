import * as React from "react";
import { configure, addDecorator } from "@storybook/react";
import { UiProvider } from "../src/theme/ui-provider";
import { useDarkMode } from "storybook-dark-mode";
import { addParameters } from "@storybook/react";
import "../assets/style.css";

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
