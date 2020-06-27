import * as React from "react";
import { Box } from ".";

export const Shell = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof Box>>(
  (props, ref) => {
    const [height, setHeight] = React.useState("100vh");

    React.useEffect(() => {
      const onResize = () => {
        setHeight(`${window.innerHeight * ((window as any).visualViewport?.scale || 1)}px`);
      };
      onResize();
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
      };
    }, []);
    return <Box style={{ height }} {...props} ref={ref} />;
  }
);

Shell.displayName = "Shell";

Shell.defaultProps = {
  display: "flex",
  flexDirection: "column",
};

export default Shell;
