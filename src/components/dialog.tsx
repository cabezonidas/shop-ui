import * as React from "react";
import { Dialog as ReachDialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { useTheme } from "../theme";

export const Dialog = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof ReachDialog>>(
  (props, ref) => {
    const { isOpen, ...otherProps } = props;

    const { open, style } = useFade(isOpen);
    const {
      mode,
      colors: { neutral },
    } = useTheme();

    return (
      <ReachDialog
        style={{
          ...style,
          borderRadius: "4px",
          transition: "transform 0.15s, opacity 0.1s",
          color: mode === "dark" ? neutral.lightest : neutral.darkest,
          backgroundColor: mode === "dark" ? neutral.darkest : neutral.lightest,
        }}
        isOpen={open}
        {...otherProps}
        ref={ref}
      />
    );
  }
);

const useFade = (isOpen: boolean) => {
  const [style, setStyle] = React.useState<React.CSSProperties>({});
  const [open, setOpen] = React.useState(isOpen);

  React.useEffect(() => {
    let alive = true;
    const myOpen = !!isOpen;
    if (!myOpen) {
      setStyle({
        opacity: 0,
        transform: "translateY(-5px)",
      });
    }
    const timeout = setTimeout(
      () => {
        if (alive) {
          setOpen(myOpen);
          if (myOpen) {
            setStyle({
              opacity: 1,
              transform: "translateY(5px)",
            });
          }
        }
      },
      myOpen ? 0 : 150
    );
    return () => {
      alive = false;
      clearTimeout(timeout);
    };
  }, [isOpen]);

  return { style, open };
};
