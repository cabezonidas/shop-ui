import Box from "./box";

export const Form = Box.withComponent("form");

Form.defaultProps = {
  noValidate: true,
  autoComplete: "off",
  width: "100%",
};

Form.displayName = "Form";

export default Form;
