import Box from "./box";
import styled from "@emotion/styled";

export const Label = styled(Box)(({ theme }) => ({
  display: "block",
  width: "100%",
  fontWeight: 600,
  margin: 0,
  fontFamily: "inherit",
  cursor: "pointer",
  padding: `${theme.space[1]} 0`,
  "&:first-letter": {
    textTransform: "uppercase",
  },
})).withComponent("label");

Label.displayName = "Label";

export default Label;
