import * as React from "react";
import { useEffect, useState, forwardRef, ComponentProps } from "react";
import { Box } from ".";

const useHeight = () => {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const onResize = () => {
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  });

  return height + "px";
};

export const Shell = forwardRef<HTMLDivElement, ComponentProps<typeof Box>>((props, ref) => {
  const height = useHeight();
  return <Box style={{ height }} {...props} ref={ref} />;
});

Shell.displayName = "Shell";

Shell.defaultProps = {
  display: "flex",
  flexDirection: "column",
};

export default Shell;
