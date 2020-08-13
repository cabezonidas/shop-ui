import * as React from "react";
import { SvgIcon, Svg } from "..";

// tslint:disable: jsx-use-translation-function

export const InvestingClubLatam = React.forwardRef<SVGSVGElement, SvgIcon>((props, ref) => {
  const green = "#8fa27a";
  const grey = "#959595";

  return (
    <Svg
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 640 640"
      width="24"
      height="24"
      style={{ userSelect: "none" }}
      {...props}
      ref={ref}
    >
      <path d="M0.76 515.04L126.38 515.04L126.38 640.66L0.76 640.66L0.76 515.04Z" fill="#021d24" />
      <path
        d="M171.25 515.04L296.87 515.04L296.87 640.66L171.25 640.66L171.25 515.04Z"
        fill="#093a4a"
      />
      <path
        d="M171.25 343.36L296.87 343.36L296.87 468.98L171.25 468.98L171.25 343.36Z"
        fill="#093a4a"
      />
      <path
        d="M470.37 640.66L344.75 640.66L344.75 515.04L470.37 515.04L470.37 640.66Z"
        fill="#1e7375"
      />
      <path
        d="M470.37 468.98L344.75 468.98L344.75 343.36L470.37 343.36L470.37 468.98Z"
        fill="#1e7375"
      />
      <path
        d="M344.75 297.3L470.37 297.3L470.37 171.68L344.75 171.68L344.75 297.3Z"
        fill="#1e7375"
      />
      <path
        d="M640.86 640.66L515.24 640.66L515.24 515.04L640.86 515.04L640.86 640.66Z"
        fill="#32adb2"
      />
      <path
        d="M515.24 468.98L640.86 468.98L640.86 343.36L515.24 343.36L515.24 468.98Z"
        fill="#32adb2"
      />
      <path
        d="M640.86 297.3L515.24 297.3L515.24 171.68L640.86 171.68L640.86 297.3Z"
        fill="#32adb2"
      />
      <path d="M515.24 125.62L640.86 125.62L640.86 0L515.24 0L515.24 125.62Z" fill="#32adb2" />
    </Svg>
  );
});
