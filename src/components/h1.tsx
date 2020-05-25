import Box from "./box";
import styled from "../theme/styled";

export const H1 = styled(Box.withComponent("h1"))(({ theme: { fontSizes } }) => ({
  fontSize: fontSizes[6],
}));

H1.displayName = "H1";

export default H1;
