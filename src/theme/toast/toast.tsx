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
          <ToastContainer top={0} left={0} right={0} style={{ pointerEvents: "none" }}>
            {topCenter((style, t) => (
              <AnimatedToast
                key={t.id}
                style={{ ...style, alignSelf: "center", pointerEvents: "all" }}
              >
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
          <ToastContainer bottom={0} left={0} right={0} style={{ pointerEvents: "none" }}>
            {bottomCenter((style, t) => (
              <AnimatedToast
                key={t.id}
                style={{ ...style, alignSelf: "center", pointerEvents: "all" }}
              >
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

ToastProvider.displayName = "ToastProvider";

type ToastVariant = "primary" | "secondary" | "default" | "info" | "warning" | "danger";

interface INotifyOptions {
  variant?: ToastVariant;
  position?: IPosition;
}
