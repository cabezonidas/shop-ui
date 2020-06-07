import * as React from "react";
import { createPortal } from "react-dom";
import { useTransition } from "react-spring";
import { ToastContainer, InnerToast, AnimatedToast } from "./toast-components";

export interface IToast {
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

export interface IToastChildrenCallback {
  close: () => void;
}
type ToastChildren = React.ReactNode | ((e: IToastChildrenCallback) => React.ReactNode);

export const useToastContext = () => React.useContext(ToastContext);

export const ToastContext = React.createContext<{
  toast: (toastChildren: ToastChildren, options?: IToastOptions) => void;
}>(undefined as any);

const takeLast = (arr: IToast[], elements: number) =>
  new Array(Math.min(elements, arr.length))
    .fill(undefined)
    .map((_, i) => i)
    .map(i => arr[arr.length - 1 - i])
    .reverse();

const reduceToasts = (toasts: IToast[]) =>
  toasts.reduce(
    (res, item) => {
      const position = item?.options?.position ?? "bottom-right";
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

const transition = (place: "left" | "right" | "top" | "bottom") => {
  if (place === "top" || place === "bottom") {
    return {
      from: { transform: `translate3d(0,${place === "top" ? "-" : ""}100%,0)`, opacity: 0 },
      enter: { transform: `translate3d(0,0px,0)`, opacity: 1 },
      leave: { transform: `translate3d(0,${place === "top" ? "-" : ""}100%,0)`, opacity: 0 },
    };
  }
  return {
    from: { [place]: "-100%", opacity: 0 },
    enter: { [place]: "0%", opacity: 1 },
    leave: { [place]: "-100%", opacity: 0 },
  };
};

export const ToastProvider: React.FC<{ defaultTimeout?: number; stack?: number }> = ({
  children,
  defaultTimeout = 3000,
  stack = 4,
}) => {
  const toasts = React.useRef<IToast[]>([]);
  const key = React.useRef(0);

  const toast = React.useCallback(
    (notification: ToastChildren, options?: IToastOptions) => {
      const newToast = { id: key.current, notification, options };
      toasts.current = takeLast([...toasts.current, newToast], stack);
      key.current++;
    },
    [key.current, stack]
  );

  const removeToast = (id: number) => (toasts.current = toasts.current.filter(t => t.id !== id));

  return (
    <>
      <ToastPortal {...{ removeToast, defaultTimeout, toasts }} />
      <ToastContext.Provider value={{ toast }}>{children}</ToastContext.Provider>
    </>
  );
};

const ToastPortal: React.FC<{
  toasts: React.MutableRefObject<IToast[]>;
  removeToast: (id: number) => void;
  defaultTimeout: number;
}> = ({ removeToast, defaultTimeout, toasts }) => {
  const [localToasts, setLocalToasts] = React.useState(toasts.current);

  // Not very efficient. This is a temp fix so that toast provider doesn't rerender children after toast updates
  React.useEffect(() => {
    let alive = true;
    const interval = setInterval(() => {
      if (alive && localToasts !== toasts.current) {
        setLocalToasts(toasts.current);
      }
    }, 150);
    return () => {
      clearInterval(interval);
      alive = false;
    };
  }, [localToasts, toasts]);

  const reducedToasts = reduceToasts(toasts.current);
  const topLeft = useTransition(reducedToasts.topLeft, transition("left"));
  const topCenter = useTransition(reducedToasts.topCenter, transition("top"));
  const topRight = useTransition(reducedToasts.topRight, transition("right"));
  const bottomLeft = useTransition(reducedToasts.bottomLeft, transition("left"));
  const bottomCenter = useTransition(reducedToasts.bottomCenter, transition("bottom"));
  const bottomRight = useTransition(reducedToasts.bottomRight, transition("right"));

  return createPortal(
    <>
      <ToastContainer top={0} right={0}>
        {topRight((style, t) => (
          <AnimatedToast key={t.id} style={{ ...style, alignSelf: "flex-end" }}>
            <InnerToast {...{ t, removeToast, defaultTimeout }} />
          </AnimatedToast>
        ))}
      </ToastContainer>
      <ToastContainer top={0} left={0} right={0}>
        {topCenter((style, t) => (
          <AnimatedToast key={t.id} style={{ ...style, alignSelf: "center" }}>
            <InnerToast {...{ t, removeToast, defaultTimeout }} />
          </AnimatedToast>
        ))}
      </ToastContainer>
      <ToastContainer top={0} left={0}>
        {topLeft((style, t) => (
          <AnimatedToast key={t.id} style={{ ...style, alignSelf: "flex-start" }}>
            <InnerToast {...{ t, removeToast, defaultTimeout }} />
          </AnimatedToast>
        ))}
      </ToastContainer>
      <ToastContainer bottom={0} right={0}>
        {bottomRight((style, t) => (
          <AnimatedToast key={t.id} style={{ ...style, alignSelf: "flex-end" }}>
            <InnerToast {...{ t, removeToast, defaultTimeout }} />
          </AnimatedToast>
        ))}
      </ToastContainer>
      <ToastContainer bottom={0} left={0} right={0}>
        {bottomCenter((style, t) => (
          <AnimatedToast key={t.id} style={{ ...style, alignSelf: "center" }}>
            <InnerToast {...{ t, removeToast, defaultTimeout }} />
          </AnimatedToast>
        ))}
      </ToastContainer>
      <ToastContainer bottom={0} left={0}>
        {bottomLeft((style, t) => (
          <AnimatedToast key={t.id} style={{ ...style, alignSelf: "flex-start" }}>
            <InnerToast {...{ t, removeToast, defaultTimeout }} />
          </AnimatedToast>
        ))}
      </ToastContainer>
    </>,
    document.body
  );
};

ToastProvider.displayName = "ToastProvider";

type ToastVariant = "primary" | "secondary" | "default" | "info" | "warning" | "danger";

interface INotifyOptions {
  variant?: ToastVariant;
  position?: IPosition;
}
