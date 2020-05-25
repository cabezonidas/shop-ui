import Box from "./box";
import styled from "../theme/styled";

export const H2 = styled(Box.withComponent("h2"))(({ theme: { fontSizes } }) => ({
  fontSize: fontSizes[5],
}));

H2.displayName = "H2";

export default H2;
