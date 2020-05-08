import InputBox from "./input-box";

export const Input = InputBox.withComponent("input");

Input.defaultProps = {
  maxLength: 255,
  type: "text",
  autoComplete: "off",
};

Input.displayName = "Input";

export default Input;
