import Box from "./box";
import styled from "../theme/styled";

export const H4 = styled(Box.withComponent("h4"))(({ theme: { fontSizes } }) => ({
  fontSize: fontSizes[2],
}));

H4.displayName = "H4";

export default H4;
