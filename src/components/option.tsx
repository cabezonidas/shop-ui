import Box from "./box";
import styled from "@emotion/styled";

export const Option = styled(Box.withComponent("option"))(({ theme }) => ({
  color: theme.colors.neutral.darkest,
}));

Option.displayName = "Option";

export default Option;
