import * as React from "react";
import { Box } from ".";
import { useTheme } from "..";
import styled from "../theme/styled";

export const DropArea = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Box> & {
    onFilesAdded: (e: React.DragEvent<HTMLDivElement>) => void;
    iconSize?: number;
  }
>((props, ref) => {
  const { onFilesAdded, iconSize, ...otherProps } = props;
  const { colors, mode } = useTheme();

  const droppingStroke = mode === "dark" ? colors.neutral.mediumLight : colors.neutral.dark;
  const idleStroke = mode === "dark" ? colors.neutral.dark : colors.neutral.mediumLight;

  const [dropping, setDropping] = React.useState(false);

  return (
    <StyledDropArea
      iconSize={iconSize ?? 30}
      iconStroke={dropping ? droppingStroke : idleStroke}
      onDrop={e => {
        e.preventDefault();
        setDropping(false);
        onFilesAdded(e);
      }}
      onDragOver={e => {
        e.preventDefault();
        setDropping(true);
      }}
      onDragLeave={e => {
        e.preventDefault();
        setDropping(false);
      }}
      {...otherProps}
      ref={ref}
    />
  );
});

const StyledDropArea = styled(Box)<{ iconStroke: string; iconSize: number }>(
  ({ iconStroke, iconSize, theme: { colors, mode } }) => `
  &::after {
    content: " ";
    border: 2px dashed ${iconStroke};
    border-radius: 4px;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    top: 0;
    background: url("data:image/svg+xml,${encodeURI(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="${iconStroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-DropArea"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`
    ).replace(/#/g, "%23")}")
      center no-repeat;
      box-shadow: inset 0 0 10px ${
        mode === "dark" ? colors.neutral.lightest : colors.neutral.darkest
      }17;
  }
`
);

DropArea.displayName = "DropAreaBox";
DropArea.defaultProps = {
  width: "100px",
  height: "100px",
};
