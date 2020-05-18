import emotionStyled, { CreateStyled } from "@emotion/styled";
import { ITheme } from "./theme";

const styled = emotionStyled as CreateStyled<ITheme>;
export default styled;
