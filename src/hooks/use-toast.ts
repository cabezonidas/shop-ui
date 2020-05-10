import * as React from "react";
import { ToastContext } from "../theme/toast-provider";

export const useToast = () => React.useContext(ToastContext);
