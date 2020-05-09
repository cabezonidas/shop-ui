import Box from "./box";
import styled from "../theme/styled";

export const Label = styled(Box.withComponent("label"))(({ theme }) => ({
  display: "block",
  width: "100%",
  margin: 0,
  cursor: "pointer",
  padding: `${theme.space[1]} 0`,
  "&:first-letter": {
    textTransform: "uppercase",
  },
}));

Label.displayName = "Label";

export default Label;
