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
  dark: "#632828",
  mediumDark: "#762f2f",
  medium: "#883636",
  mediumLight: "#9a3d3d",
  light: "#934a4a",
  lightest: "#c39a9a",
};

export const secondary: IColorTheme = {
  darkest: "#003542",
  dark: "#004F62",
  mediumDark: "#266979",
  medium: "#6695A1",
  mediumLight: "#8CB0B8",
  light: "#8CB0B8",
  lightest: "#D9E5E8",
};
export const neutral: IColorTheme = {
  darkest: "#27323F",
  dark: "#4E5864",
  mediumDark: "#818D9D",
  medium: "#B8C4CE",
  mediumLight: "#D9DFE5",
  light: "#F3F5F7",
  lightest: "#FFFFFF",
};
export const info: IColorTheme = {
  darkest: "#203D54",
  dark: "#1A4971",
  mediumDark: "#205E92",
  medium: "#2368A2",
  mediumLight: "#63A2D8",
  light: "#AAD4F5",
  lightest: "#EFF8FF",
};
export const warning: IColorTheme = {
  darkest: "#AC5500",
  dark: "#BB6711",
  mediumDark: "#E08122",
  medium: "#F29D49",
  mediumLight: "#FFB366",
  light: "#FFD1A2",
  lightest: "#FFEBD7",
};
export const danger: IColorTheme = {
  darkest: "#891B1B",
  dark: "#B82020",
  mediumDark: "#DC3030",
  medium: "#E46666",
  mediumLight: "#F29E9E",
  light: "#FBD3D3",
  lightest: "#FCE8E8",
};
export const success: IColorTheme = {
  darkest: "#135239",
  dark: "#177741",
  mediumDark: "#239D58",
  medium: "#36C172",
  mediumLight: "#73D99F",
  light: "#A8EEC1",
  lightest: "#E3FCEC",
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
