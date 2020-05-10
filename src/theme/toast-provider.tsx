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

export type IPosition =
  | "top-left"
  | "top-center"
  | "top-right"
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

const ToastContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  zIndex: 1,
  overflow: "hidden",
  padding: theme.space[3],
  display: "flex",
  flexDirection: "column",
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

const reduceToasts = (toasts: IToast[]) =>
  toasts.reduce(
    (res, item) => {
      const position = item?.options.position ?? "bottom-right";
      switch (position) {
        case "top-left":
          return { ...res, topLeft: [...res.topLeft, item] };
        case "top-center":
          return { ...res, topCenter: [...res.topCenter, item] };
        case "top-right":
          return { ...res, topRight: [...res.topRight, item] };
        case "bottom-left":
          return { ...res, bottomLeft: [...res.bottomLeft, item] };
        case "bottom-center":
          return { ...res, bottomCenter: [...res.bottomCenter, item] };
        case "bottom-right":
          return { ...res, bottomRight: [...res.bottomRight, item] };
      }
    },
    {
      topLeft: [] as IToast[],
      topCenter: [] as IToast[],
      topRight: [] as IToast[],
      bottomLeft: [] as IToast[],
      bottomCenter: [] as IToast[],
      bottomRight: [] as IToast[],
    }
  );

const transition = (place: "left" | "right" | "top" | "bottom") => ({
  from: { [place]: "-100%" },
  enter: { [place]: "0%" },
  leave: { [place]: "-100%" },
});

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

  const reducedToasts = reduceToasts(toasts);

  const topLeft = useTransition(reducedToasts.topLeft, transition("left"));
  const topCenter = useTransition(reducedToasts.topCenter, transition("top"));
  const topRight = useTransition(reducedToasts.topRight, transition("right"));
  const bottomLeft = useTransition(reducedToasts.bottomLeft, transition("left"));
  const bottomCenter = useTransition(reducedToasts.bottomCenter, transition("bottom"));
  const bottomRight = useTransition(reducedToasts.bottomRight, transition("right"));

  return (
    <ToastContext.Provider value={{ toast }}>
      {createPortal(
        <>
          <ToastContainer top={0} right={0}>
            {topRight((style, t) => (
              <AnimatedToast key={t.id} style={{ ...style, alignSelf: "flex-end" }}>
                <InnerToast {...{ t, setToasts, defaultTimeout }} />
              </AnimatedToast>
            ))}
          </ToastContainer>
          <ToastContainer top={0} left={0} right={0}>
            {topCenter((style, t) => (
              <AnimatedToast key={t.id} style={{ ...style, alignSelf: "center" }}>
                <InnerToast {...{ t, setToasts, defaultTimeout }} />
              </AnimatedToast>
            ))}
          </ToastContainer>
          <ToastContainer top={0} left={0}>
            {topLeft((style, t) => (
              <AnimatedToast key={t.id} style={{ ...style, alignSelf: "flex-start" }}>
                <InnerToast {...{ t, setToasts, defaultTimeout }} />
              </AnimatedToast>
            ))}
          </ToastContainer>
          <ToastContainer bottom={0} right={0}>
            {bottomRight((style, t) => (
              <AnimatedToast key={t.id} style={{ ...style, alignSelf: "flex-end" }}>
                <InnerToast {...{ t, setToasts, defaultTimeout }} />
              </AnimatedToast>
            ))}
          </ToastContainer>
          <ToastContainer bottom={0} right={0} left={0}>
            {bottomCenter((style, t) => (
              <AnimatedToast key={t.id} style={{ ...style, alignSelf: "center" }}>
                <InnerToast {...{ t, setToasts, defaultTimeout }} />
              </AnimatedToast>
            ))}
          </ToastContainer>
          <ToastContainer bottom={0} left={0}>
            {bottomLeft((style, t) => (
              <AnimatedToast key={t.id} style={{ ...style, alignSelf: "flex-start" }}>
                <InnerToast {...{ t, setToasts, defaultTimeout }} />
              </AnimatedToast>
            ))}
          </ToastContainer>
        </>,
        document.body
      )}
      {children}
    </ToastContext.Provider>
  );
};

ToastState.displayName = "ToastState";

const InnerToast: React.FC<{
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

const AnimatedToast = animated(Box);
