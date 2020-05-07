import styled from "../theme/styled";
import isPropValid from "@emotion/is-prop-valid";
import {
  compose,
  alignContent,
  alignItems,
  alignSelf,
  background,
  borders,
  bottom,
  color,
  display,
  flex,
  flexBasis,
  flexbox,
  flexDirection,
  flexWrap,
  fontFamily,
  fontSize,
  fontStyle,
  fontWeight,
  gridArea,
  gridAutoColumns,
  gridAutoFlow,
  gridAutoRows,
  gridColumn,
  gridColumnGap,
  gridGap,
  gridRow,
  gridRowGap,
  gridTemplateAreas,
  gridTemplateColumns,
  gridTemplateRows,
  height,
  justifyContent,
  justifySelf,
  left,
  letterSpacing,
  lineHeight,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  order,
  overflow,
  position,
  right,
  space,
  textAlign,
  top,
  verticalAlign,
  width,
  zIndex,
} from "styled-system";
import {
  AlignContentProps,
  AlignItemsProps,
  AlignSelfProps,
  BackgroundColorProps,
  BackgroundProps,
  BordersProps,
  BottomProps,
  DisplayProps,
  FlexBasisProps,
  FlexDirectionProps,
  FlexGrowProps,
  FlexProps,
  FlexShrinkProps,
  FlexWrapProps,
  FlexboxProps,
  FontFamilyProps,
  FontSizeProps,
  FontStyleProps,
  FontWeightProps,
  GridAreaProps,
  GridAutoColumnsProps,
  GridAutoFlowProps,
  GridAutoRowsProps,
  GridColumnGapProps,
  GridColumnProps,
  GridGapProps,
  GridRowGapProps,
  GridRowProps,
  GridTemplateAreasProps,
  GridTemplateColumnsProps,
  GridTemplateRowsProps,
  HeightProps,
  JustifyContentProps,
  JustifySelfProps,
  LeftProps,
  LetterSpacingProps,
  LineHeightProps,
  MaxHeightProps,
  MaxWidthProps,
  MinHeightProps,
  MinWidthProps,
  OrderProps,
  OverflowProps,
  PositionProps,
  RightProps,
  SpaceProps,
  TextAlignProps,
  TopProps,
  VerticalAlignProps,
  WidthProps,
  ZIndexProps,
} from "styled-system";

type StyleBoxProps = AlignContentProps &
  AlignItemsProps &
  AlignSelfProps &
  BackgroundColorProps &
  BackgroundProps &
  BordersProps &
  BottomProps &
  DisplayProps &
  FlexBasisProps &
  FlexboxProps &
  FlexDirectionProps &
  FlexGrowProps &
  FlexProps &
  FlexShrinkProps &
  FlexWrapProps &
  FontFamilyProps &
  FontSizeProps &
  FontStyleProps &
  FontWeightProps &
  GridAreaProps &
  GridAutoColumnsProps &
  GridAutoFlowProps &
  GridAutoRowsProps &
  GridColumnGapProps &
  GridColumnProps &
  GridGapProps &
  GridRowGapProps &
  GridRowProps &
  GridTemplateAreasProps &
  GridTemplateColumnsProps &
  GridTemplateRowsProps &
  HeightProps &
  JustifyContentProps &
  JustifySelfProps &
  LeftProps &
  LetterSpacingProps &
  LineHeightProps &
  MaxHeightProps &
  MaxWidthProps &
  MinHeightProps &
  MinWidthProps &
  OrderProps &
  OverflowProps &
  PositionProps &
  RightProps &
  SpaceProps &
  TextAlignProps &
  TopProps &
  WidthProps &
  VerticalAlignProps &
  ZIndexProps & {
    as?: any;
    variant?: string;
  };

export type BoxProps = StyleBoxProps;

export const Box = styled("div", {
  shouldForwardProp: prop => isPropValid(prop),
})<StyleBoxProps>`
  box-sizing: border-box;
  position: relative;
  ${compose(
    alignContent,
    alignItems,
    alignSelf,
    background,
    borders,
    bottom,
    color,
    display,
    flex,
    flexBasis,
    flexbox,
    flexDirection,
    flexWrap,
    fontFamily,
    fontSize,
    fontStyle,
    fontWeight,
    gridArea,
    gridAutoColumns,
    gridAutoFlow,
    gridAutoRows,
    gridColumn,
    gridColumnGap,
    gridGap,
    gridRow,
    gridRowGap,
    gridTemplateAreas,
    gridTemplateColumns,
    gridTemplateRows,
    height,
    justifyContent,
    justifySelf,
    left,
    letterSpacing,
    lineHeight,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    order,
    overflow,
    position,
    right,
    space,
    textAlign,
    top,
    verticalAlign,
    width,
    zIndex
  )};
`;

Box.displayName = "Box";

export default Box;
