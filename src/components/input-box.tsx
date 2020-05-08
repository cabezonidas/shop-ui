import Box from "./box";
import styled from "../theme/styled";

export const InputBox = styled(Box)(({ theme: { colors: { neutral }, space, mode } }) => ({
  appearance: "none",
  height: space[6],
  paddingLeft: space[3],
  paddingRight: space[6],
  backgroundColor: "transparent",
  borderColor: neutral.medium,
  borderWidth: 1,
  borderStyle: "solid",
  transition: "border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s",
  color: mode === "dark" ? neutral.light : neutral.dark,
  outlineColor: neutral.mediumDark,
  "&:hover": {
    borderColor: neutral.mediumDark,
  },
  "&:active": {
    borderColor: neutral.mediumDark,
    zIndex: 1,
  },
  "&:focus": {
    borderColor: neutral.mediumDark,
    zIndex: 1,
  },
  "&:disabled": {
    color: neutral.mediumDark,
    cursor: "not-allowed",
  },
  "::placeholder": {
    color: neutral.mediumDark,
  },
  m: 0,
  borderRadius: space[1],
  width: "100%",
}));

InputBox.displayName = "InputBox";

export default InputBox;
