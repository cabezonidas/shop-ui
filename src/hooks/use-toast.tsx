import * as React from "react";
import { ToastContext } from "../theme/toast-provider";
import styled from "@emotion/styled";
import { Button, Box } from "..";
import { Close } from "../icons";

const Toast = styled(Button.withComponent("div"))(({ theme }) => ({
  minWidth: 300,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginRight: theme.space[5],
  marginBottom: theme.space[5],
  padding: theme.space[5],
  borderRadius: theme.space[2],
}));

type ToastVariant = "primary" | "secondary" | "default" | "info" | "warning" | "danger";

export const useToast = () => {
  const { toast } = React.useContext(ToastContext);

  const notify = (message: string, variant: ToastVariant = "primary") => {
    if (variant !== "danger") {
      toast(<Toast variant={variant}>{message}</Toast>, { timeout: 3000 });
    } else {
      toast(
        e => (
          <Toast variant={variant}>
            <Box>{message}</Box>
            <Button variant="transparent" onClick={() => e.close()} color="inherit !important">
              <Close width="12" height="12" />
            </Button>
          </Toast>
        ),
        { timeout: "persist" }
      );
    }
  };

  return { toast, notify };
};
