import emotionStyled, { CreateStyled } from "@emotion/styled";
import { ITheme } from "./theme";
import { useContext } from "react";
import { ThemeContext } from "@emotion/core";

export const useTheme = () => useContext(ThemeContext) as ITheme;
export const styled = emotionStyled as CreateStyled<ITheme>;
