export interface IColorTheme {
  darkest: string;
  dark: string;
  mediumDark: string;
  medium: string;
  mediumLight: string;
  light: string;
  lightest: string;
}

export const primary: IColorTheme = {
  darkest: "#512020",
  dark: "#5f2525",
  mediumDark: "#6c2b2b",
  medium: "#7a3030",
  mediumLight: "#883636",
  light: "#934a4a",
  lightest: "#9f5e5e",
};

export const secondary: IColorTheme = {
  darkest: "#d0c3ae",
  dark: "#e7d9c1",
  mediumDark: "#ffefd5",
  medium: "#fff3e0",
  mediumLight: "#fff3e0",
  light: "#fffaf3",
  lightest: "#fffaf3",
};

export const neutral: IColorTheme = {
  darkest: "#1e2227",
  dark: "#323a41",
  mediumDark: "#515d68",
  medium: "#657482",
  mediumLight: "#97a2ae",
  light: "#d8dce0",
  lightest: "#f2f3f4",
};

export const info: IColorTheme = {
  darkest: "#1d2f66",
  dark: "#29428f",
  mediumDark: "#3555b8",
  medium: "#4169e1",
  mediumLight: "#6384e6",
  light: "#869feb",
  lightest: "#a8baf1",
};

export const warning: IColorTheme = {
  darkest: "#733f00",
  dark: "#a25900",
  mediumDark: "#d07200",
  medium: "#ff8c00",
  mediumLight: "#ffa02e",
  light: "#ffb55c",
  lightest: "#ffca8b",
};

export const danger: IColorTheme = {
  darkest: "#731f00",
  dark: "#a22b00",
  mediumDark: "#d03800",
  medium: "#ff4500",
  mediumLight: "#ff5517",
  light: "#ff7745",
  lightest: "#ff9973",
};

export const success: IColorTheme = {
  darkest: "#30400f",
  dark: "#445a16",
  mediumDark: "#57741c",
  medium: "#6b8e23",
  mediumLight: "#789837",
  light: "#93ac5f",
  lightest: "#aec187",
};

export interface IColors {
  primary: IColorTheme;
  secondary: IColorTheme;
  neutral: IColorTheme;
  info: IColorTheme;
  warning: IColorTheme;
  danger: IColorTheme;
  success: IColorTheme;
}

export const colors: IColors = {
  primary,
  secondary,
  neutral,
  info,
  warning,
  danger,
  success,
};
