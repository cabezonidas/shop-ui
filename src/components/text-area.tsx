import Input from "./input";
import styled from "../theme/styled";
import { BoxProps } from "./box";

export const TextArea = styled(Input)<BoxProps>(({ theme }) => ({
  padding: theme.space[2],
  borderRadius: theme.space[1],
  minWidth: "100%",
  maxWidth: "min-content",
  height: theme.space[10],
  minHeight: theme.space[8],
})).withComponent("textarea");

TextArea.displayName = "TextArea";

TextArea.defaultProps = {
  maxLength: 255,
};

export default TextArea;
