import * as React from "react";
import { ToastContext, IPosition } from "../theme/toast-provider";
import styled from "@emotion/styled";
import { Button, Box } from "..";
import { Close } from "../icons";

const Toast = styled(Button.withComponent("div"))(({ theme }) => ({
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

interface INotifyOptions {
  variant?: ToastVariant;
  position?: IPosition;
}

export const useToast = () => {
  const { toast } = React.useContext(ToastContext);

  const notify = (message: string, options: INotifyOptions) => {
    const variant = options?.variant ?? "primary";
    const position = options?.position ?? "bottom-right";
    if (variant !== "danger") {
      toast(
        e => (
          <Toast variant={variant} onClick={() => e.close()}>
            {message}
          </Toast>
        ),
        { timeout: 3000, position }
      );
    } else {
      toast(
        e => (
          <Toast variant={variant} onClick={() => e.close()}>
            <Box>{message}</Box>
            <Button variant="transparent" color="inherit !important">
              <Close width="12" height="12" />
            </Button>
          </Toast>
        ),
        { timeout: "persist", position }
      );
    }
  };

  return { toast, notify };
};
