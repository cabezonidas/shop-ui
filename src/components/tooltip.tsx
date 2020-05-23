import Box from "./box";
import * as React from "react";
import styled from "../theme/styled";
import Tippy from "@tippyjs/react";
import { useSpring, animated } from "react-spring";

type TooltipType = Omit<React.ComponentProps<typeof Tippy>, "render">;

export const Tooltip: React.FC<TooltipType> = ({ content, ...props }) => {
  const config = { tension: 300, friction: 15 };
  const initialStyles = { opacity: 0, transform: "scale(0.5)" };
  const [style, setStyle] = useSpring(() => initialStyles);

  function onMount() {
    setStyle({
      opacity: 1,
      transform: "scale(1)",
      onRest: () => ({}),
      config,
    });
  }

  function onHide({ unmount }) {
    setStyle({
      ...initialStyles,
      onRest: unmount,
      config: { ...config, clamp: true },
    });
  }

  return (
    <Tippy
      render={attrs => (
        <TooltipContent style={style} {...attrs}>
          {content}
        </TooltipContent>
      )}
      arrow={false}
      animation={true}
      onMount={onMount}
      onHide={onHide}
      {...props}
    />
  );
};

const TooltipContent = animated(
  styled(Box)(({ theme }) => ({
    padding: `${theme.space[2]} ${theme.space[4]}`,
    color: theme.colors.neutral.lightest,
    borderRadius: 4,
    boxShadow: `0 1px 2px rgba(39, 50, 63, 0.4), 0 1px 1px 0px 8px 12px rgba(39, 50, 63, 0.15)`,
    background: theme.colors.neutral.dark,
  }))
);

Tooltip.displayName = "Tooltip";

export default Tooltip;
