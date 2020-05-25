import Box from "./box";
import styled from "../theme/styled";

export const H3 = styled(Box.withComponent("h3"))(({ theme: { fontSizes } }) => ({
  fontSize: fontSizes[4],
}));

H3.displayName = "H3";

export default H3;
