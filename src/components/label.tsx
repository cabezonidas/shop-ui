import Box from "./box";
import styled from "@emotion/styled";

export const Label = styled(Box)`
  display: block;
  margin: 0;
  box-sizing: border-box;
  font-family: inherit;
  cursor: pointer;
  &:first-letter {
    text-transform: uppercase;
  }
`.withComponent("label");

Label.defaultProps = {
  mb: 2,
  lineHeight: 1.3,
  width: "100%",
  fontWeight: 600,
};

export default Label;
