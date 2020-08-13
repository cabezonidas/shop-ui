import styled from "../theme/styled";
import isPropValid from "@emotion/is-prop-valid";
import {
  compose,
  alignContent,
  alignItems,
  alignSelf,
  background,
  boxShadow,
  border,
  borders,
  bottom,
  color,
  colorStyle,
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
  grid,
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
  justifyItems,
  justifyContent,
  justifySelf,
  layout,
  left,
  letterSpacing,
  lineHeight,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  order,
  overflow,
  opacity,
  position,
  right,
  size,
  space,
  textAlign,
  textShadow,
  textStyle,
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
  BorderProps,
  BottomProps,
  BoxShadowProps,
  ColorProps,
  ColorStyleProps,
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
  GridProps,
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
  JustifyItemsProps,
  JustifySelfProps,
  LayoutProps,
  LeftProps,
  LetterSpacingProps,
  LineHeightProps,
  MaxHeightProps,
  MaxWidthProps,
  MinHeightProps,
  MinWidthProps,
  OpacityProps,
  OrderProps,
  OverflowProps,
  PositionProps,
  RightProps,
  SizeProps,
  SpaceProps,
  TextAlignProps,
  TextShadowProps,
  TextStyleProps,
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
  BorderProps &
  BottomProps &
  BoxShadowProps &
  Omit<ColorProps, "color"> &
  ColorStyleProps &
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
  GridProps &
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
  JustifyItemsProps &
  JustifySelfProps &
  LayoutProps &
  LeftProps &
  LetterSpacingProps &
  LineHeightProps &
  MaxHeightProps &
  MaxWidthProps &
  MinHeightProps &
  MinWidthProps &
  OrderProps &
  OverflowProps &
  OpacityProps &
  PositionProps &
  RightProps &
  SizeProps &
  SpaceProps &
  TextAlignProps &
  TextShadowProps &
  TextStyleProps &
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
    boxShadow,
    border,
    borders,
    bottom,
    color,
    colorStyle,
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
    grid,
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
    justifyItems,
    justifyContent,
    justifySelf,
    left,
    layout,
    letterSpacing,
    lineHeight,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    opacity,
    order,
    overflow,
    position,
    right,
    size,
    space,
    textAlign,
    textShadow,
    textStyle,
    top,
    verticalAlign,
    width,
    zIndex
  )};
`;

Box.displayName = "Box";

export default Box;
