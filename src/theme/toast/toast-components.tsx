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
  position: "absolute",
  zIndex: 1,
  overflow: "hidden",
  padding: theme.space[3],
  display: "flex",
  flexDirection: "column",
}));

export const InnerToast: React.FC<{
  t: IToast;
  setToasts: React.Dispatch<React.SetStateAction<IToast[]>>;
  defaultTimeout: number;
}> = props => {
  const { t, setToasts, defaultTimeout } = props;
  return (
    <ToastTimeout
      removeToast={() => setToasts(ts => ts.filter(n => n.id !== t.id))}
      expiry={timeout(defaultTimeout, t.options)}
    >
      {typeof t.notification === "function"
        ? t.notification({
            close: () => setToasts(tts => tts.filter(tt => tt.id !== t.id)),
          })
        : t.notification}
    </ToastTimeout>
  );
};

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

export const AnimatedToast = animated(Box);

export const Toast = styled(Button.withComponent("div"))(({ theme }) => ({
  width: 300,
  maxWidth: "90%",
  overflow: "hidden",
  whiteSpace: "nowrap",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "inherit",
  marginBottom: theme.space[2],
  padding: theme.space[5],
  borderRadius: theme.space[2],
}));

type ToastVariant = "primary" | "secondary" | "default" | "info" | "warning" | "danger";

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
      <Box>{message}</Box>
      <Button variant="transparent" color="inherit !important">
        <Close width="12" height="12" style={{ alignSelf: "center" }} />
      </Button>
    </Toast>
  ),
});
