import Box from "./box";
import { styled } from "../theme";

export const Form = styled(Box.withComponent("form"))(() => ({
  width: "100%",
}));

Form.defaultProps = {
  noValidate: true,
  autoComplete: "off",
};

Form.displayName = "Form";

export default Form;
