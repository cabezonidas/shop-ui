import Input from "./input";
import styled from "../theme/styled";
import { BoxProps } from "./box";

export const File = styled(Input)<BoxProps>(({ theme }) => ({
  paddingTop: theme.space[1],
}));

File.displayName = "File";

File.defaultProps = {
  type: "file",
};

export default File;
