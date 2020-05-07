import Box from "./box";
import { styled } from "../theme";

export const Form = styled(Box)(() => ({
  width: "100%",
})).withComponent("form");

Form.defaultProps = {
  noValidate: true,
  autoComplete: "off",
};

Form.displayName = "Form";

export default Form;
