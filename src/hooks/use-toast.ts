import { useToastContext } from "../theme/toast/toast";
import { safeToast, dangerToast, INotifyOptions } from "../theme/toast/toast-components";

export const useToast = () => {
  const { toast } = useToastContext();

  const notify = (message: string, options?: INotifyOptions) => {
    const variant = options?.variant ?? "primary";
    const position = options?.position ?? "bottom-right";
    if (variant !== "danger") {
      const { toastChildren } = safeToast(variant, message);
      toast(toastChildren, { timeout: 3000, position });
    } else {
      const { toastChildren } = dangerToast(variant, message);
      toast(toastChildren, { timeout: "persist", position });
    }
  };

  return { toast, notify };
};
