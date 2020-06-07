import * as React from "react";
import { animated } from "react-spring";
import styled from "../styled";
import { Button, Box } from "../../components";
import { Close } from "../../icons";
import { IPosition, IToastOptions, IToast, IToastChildrenCallback } from "./toast";

const timeout = (defaultTimeout: number, options?: IToastOptions) =>
  options === undefined || options.timeout === undefined
    ? defaultTimeout
    : options.timeout === "persist"
    ? undefined
    : options.timeout;

export const ToastContainer = styled(Box)(({ theme }) => ({
  pointerEvents: "none",
  overflow: "hidden",
  position: "absolute",
  zIndex: 1,
  padding: theme.space[3],
  display: "flex",
  flexDirection: "column",
  maxWidth: "100%",
}));
ToastContainer.displayName = "ToastContainer";

export const InnerToast: React.FC<{
  t: IToast;
  removeToast: (id: number) => void;
  defaultTimeout: number;
}> = props => {
  const { t, removeToast, defaultTimeout } = props;
  return (
    <ToastTimeout removeToast={() => removeToast(t.id)} expiry={timeout(defaultTimeout, t.options)}>
      {typeof t.notification === "function"
        ? t.notification({
            close: () => removeToast(t.id),
          })
        : t.notification}
    </ToastTimeout>
  );
};
InnerToast.displayName = "InnerToast";

interface IToastProps {
  removeToast: () => void;
  expiry?: number;
}
const ToastTimeout: React.FC<IToastProps> = props => {
  const { removeToast, expiry, children } = props;
  React.useEffect(() => {
    if (expiry !== undefined) {
      const timer = setTimeout(() => {
        removeToast();
      }, expiry);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [expiry, removeToast]);

  return <>{children}</>;
};
ToastTimeout.displayName = "ToastTimeout";

export const AnimatedToast = animated(
  styled(Box)(() => ({
    pointerEvents: "all",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    maxWidth: "100%",
  }))
);
AnimatedToast.displayName = "AnimatedToast";

export const Toast = styled(Button.withComponent("div"))(({ theme }) => ({
  minWidth: 300,
  maxWidth: 300,
  whiteSpace: "normal",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "inherit",
  marginBottom: theme.space[2],
  marginLeft: "auto",
  marginRight: "auto",
  padding: theme.space[5],
  borderRadius: theme.space[2],
}));
Toast.displayName = "Toast";

type ToastVariant = "primary" | "secondary" | "success" | "default" | "info" | "warning" | "danger";

export interface INotifyOptions {
  variant?: ToastVariant;
  position?: IPosition;
}

export const safeToast = (variant: ToastVariant, message: string) => ({
  toastChildren: (e: IToastChildrenCallback) => (
    <Toast variant={variant} onClick={() => e.close()}>
      {message}
    </Toast>
  ),
});

export const dangerToast = (variant: ToastVariant, message: string) => ({
  toastChildren: (e: IToastChildrenCallback) => (
    <Toast variant={variant} onClick={() => e.close()}>
      <Box overflow="hidden" style={{ textOverflow: "ellipsis" }}>
        {message}
      </Box>
      <Button variant="transparent" color="inherit !important">
        <Close width="12" height="12" style={{ alignSelf: "center" }} />
      </Button>
    </Toast>
  ),
});
