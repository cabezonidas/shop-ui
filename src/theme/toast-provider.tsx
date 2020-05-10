import * as React from "react";
import { styled } from "..";
import { createPortal } from "react-dom";
import { Box } from "../components";
import { isArray } from "util";
import { useTransition, animated } from "react-spring";

interface IToast {
  id: number;
  notification: ToastChildren;
  options?: IToastOptions;
}

export interface IToastOptions {
  timeout?: number | "persist";
}

type ToastChildren = React.ReactNode | ((e: { close: () => void }) => React.ReactNode);

export const ToastContext = React.createContext<{
  toast: (toastChildren: ToastChildren, options?: IToastOptions) => void;
}>(undefined as any);

const ToastContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  zIndex: 1,
  bottom: 0,
  right: 0,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  padding: theme.space[1],
}));

const timeout = (defaultTimeout: number, options?: IToastOptions) =>
  options === undefined || options.timeout === undefined
    ? defaultTimeout
    : options.timeout === "persist"
    ? undefined
    : options.timeout;

function takeLast<T>(arr: T, elements: number): T {
  if (!isArray(arr)) {
    return arr;
  }
  const res = new Array(Math.min(elements, arr.length))
    .fill(undefined)
    .map((_, i) => i)
    .map(i => arr[arr.length - 1 - i])
    .reverse();
  return (res as unknown) as T;
}

export const ToastState: React.FC<{ defaultTimeout?: number; stack?: number }> = ({
  children,
  defaultTimeout = 3000,
  stack = 4,
}) => {
  const [toasts, setToasts] = React.useState<IToast[]>([]);
  const key = React.useRef(0);

  const toast = React.useCallback(
    (notification: ToastChildren, options?: IToastOptions) => {
      const newToast = { id: key.current, notification, options };
      setToasts(t => takeLast([...t, newToast], stack));
      key.current++;
    },
    [setToasts, key.current, stack]
  );

  const transitions = useTransition(toasts, {
    from: { right: "-100%" },
    enter: { right: "0%" },
    leave: { right: "-100%" },
  });

  console.log(transitions);

  return (
    <ToastContext.Provider value={{ toast }}>
      {createPortal(
        <ToastContainer>
          {transitions((style, t) => (
            <AnimatedToast key={t.id} style={style} ml="auto">
              <Toast
                removeToast={() => setToasts(ts => ts.filter(n => n.id !== t.id))}
                expiry={timeout(defaultTimeout, t.options)}
              >
                {typeof t.notification === "function"
                  ? t.notification({
                      close: () => setToasts(tts => tts.filter(tt => tt.id !== t.id)),
                    })
                  : t.notification}
              </Toast>
            </AnimatedToast>
          ))}
        </ToastContainer>,
        document.body
      )}
      {children}
    </ToastContext.Provider>
  );
};

ToastState.displayName = "ToastState";

interface IToastProps {
  removeToast: () => void;
  expiry?: number;
}
const Toast: React.FC<IToastProps> = props => {
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
Toast.displayName = "Toast";

const AnimatedToast = animated(Box);
