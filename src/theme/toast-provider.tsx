import * as React from "react";
import { styled } from "..";
import { createPortal } from "react-dom";
import { Box } from "../components";

interface IToast {
  id: number;
  notification: ToastChildren;
  options?: IToastOptions;
}

type IPosition =
  | "up-left"
  | "up-center"
  | "up-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface IToastOptions {
  timeout?: number | "persist";
  position?: IPosition;
}

type ToastChildren = React.ReactNode | ((e: { close: () => void }) => React.ReactNode);

export const ToastContext = React.createContext<{
  toast: (toastChildren: ToastChildren, options?: IToastOptions) => void;
}>(undefined as any);

const Wrapper = styled(Box)(() => ({ position: "absolute", zIndex: 1 }));

const timeout = (defaultTimeout: number, options?: IToastOptions) =>
  options === undefined || options.timeout === undefined
    ? defaultTimeout
    : options.timeout === "persist"
    ? undefined
    : options.timeout;

export const ToastState: React.FC<{ defaultTimeout?: number }> = ({
  children,
  defaultTimeout = 3000,
}) => {
  const [toasts, setToasts] = React.useState<IToast[]>([]);
  const key = React.useRef(0);

  const toast = React.useCallback(
    (notification: ToastChildren, options?: IToastOptions) => {
      setToasts(t => [...t, { id: key.current, notification, options }]);
      key.current++;
    },
    [setToasts, key]
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {createPortal(
        <Wrapper top={0} right={0}>
          {toasts.map(t => (
            <Toast
              key={t.id}
              removeToast={() => setToasts(ts => ts.filter(n => n.id !== t.id))}
              expiry={timeout(defaultTimeout, t.options)}
            >
              {typeof t.notification === "function"
                ? t.notification({
                    close: () => setToasts(tts => tts.filter(tt => tt.id !== t.id)),
                  })
                : t.notification}
            </Toast>
          ))}
        </Wrapper>,
        document.body
      )}
      {children}
    </ToastContext.Provider>
  );
};

const Toast: React.FC<{ removeToast: () => void; expiry?: number }> = ({
  children,
  removeToast,
  expiry,
}) => {
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

Toast.displayName = "Toast";
