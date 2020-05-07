import * as React from "react";
import { Dialog as ReachDialog } from "@reach/dialog";
import { useTheme } from "../theme";
import { Box, Button } from ".";
import { Close } from "../icons";
import "@reach/dialog/styles.css";
import { useTranslation } from "react-i18next";

interface IDialogProps extends React.ComponentProps<typeof ReachDialog> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  containerProps?: React.ComponentProps<typeof Box>;
}

const enUsDialog = { ui: { dialog: { close: "Close dialog" } } };
const esArDialog = { ui: { dialog: { close: "Cerrar diálogo" } } };

export const Dialog = React.forwardRef<HTMLDivElement, IDialogProps>((props, ref) => {
  const { isOpen, header, footer, children, containerProps, ...otherProps } = props;
  const { onDismiss } = props;
  const { open, style } = useFade(isOpen);
  const gridTemplateRows =
    header && footer ? "auto 1fr auto" : header ? "auto 1fr" : footer ? "1fr auto" : "1fr";

  const {
    mode,
    colors: { neutral },
  } = useTheme();

  const { t, i18n } = useTranslation();
  i18n.addResourceBundle("en-US", "translation", enUsDialog, true, true);
  i18n.addResourceBundle("es-AR", "translation", esArDialog, true, true);

  return (
    <ReachDialog
      style={{
        ...style,
        borderRadius: "4px",
        transition: "transform 0.15s, opacity 0.1s",
        color: mode === "dark" ? neutral.lightest : neutral.darkest,
        backgroundColor: mode === "dark" ? neutral.darkest : neutral.lightest,
        maxWidth: "90%",
        width: "min-content",
        padding: 0,
      }}
      isOpen={open}
      {...otherProps}
      ref={ref}
    >
      <Box
        display="grid"
        p="6"
        maxWidth="100%"
        width={["300px", "500px", "750px", "1000px"]}
        minHeight="200px"
        gridTemplateRows={gridTemplateRows}
        gridGap="4"
        {...containerProps}
      >
        {header && (
          <Box display="grid" gridTemplateColumns="1fr auto" gridGap="2">
            <Box>{header}</Box>
            <Box>
              <Button variant="transparent" onClick={onDismiss} aria-label={t("ui.dialog.close")}>
                <Close />
              </Button>
            </Box>
          </Box>
        )}
        {children}
        {footer && (
          <Box display="flex" justifyContent="flex-end">
            {footer}
          </Box>
        )}
      </Box>
    </ReachDialog>
  );
});

const useFade = (isOpen: boolean) => {
  const [style, setStyle] = React.useState<React.CSSProperties>({});
  const [open, setOpen] = React.useState(isOpen);

  React.useEffect(() => {
    let alive = true;
    const myOpen = !!isOpen;
    let timeout: NodeJS.Timeout;
    if (myOpen) {
      setOpen(myOpen);
      timeout = setTimeout(() => {
        if (alive) {
          setStyle({
            opacity: 1,
            transform: "translateY(5px)",
          });
        }
      }, 150);
    } else {
      timeout = setTimeout(() => {
        if (alive) {
          setOpen(myOpen);
        }
      }, 150);
      setStyle({
        opacity: 0,
        transform: "translateY(-5px)",
      });
    }
    return () => {
      alive = false;
      clearTimeout(timeout);
    };
  }, [isOpen]);

  return { style, open };
};
