import Input from "./input";
import { styled } from "../theme";

export const File = styled(Input)(({ theme }) => ({
  paddingTop: theme.space[1],
})).withComponent("input");

File.displayName = "File";

File.defaultProps = {
  type: "file",
};

export default File;
