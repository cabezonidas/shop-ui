import * as React from "react";
import { styled } from "..";
import { createPortal } from "react-dom";
import { isArray } from "util";
import { useTransition, animated } from "react-spring";
import { Button, Box } from "..";
import { Close } from "../icons";

interface IToast {
  id: number;
  notification: ToastChildren;
  options?: IToastOptions;
}

type IPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

interface IToastOptions {
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

ToastProvider.displayName = "ToastProvider";

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

const StyledToast = styled(Button.withComponent("div"))(({ theme }) => ({
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

  const notify = (message: string, options?: INotifyOptions) => {
    const variant = options?.variant ?? "primary";
    const position = options?.position ?? "bottom-right";
    if (variant !== "danger") {
      toast(
        e => (
          <StyledToast variant={variant} onClick={() => e.close()}>
            {message}
          </StyledToast>
        ),
        { timeout: 3000, position }
      );
    } else {
      toast(
        e => (
          <StyledToast variant={variant} onClick={() => e.close()}>
            <Box>{message}</Box>
            <Button variant="transparent" color="inherit !important">
              <Close width="12" height="12" style={{ alignSelf: "center" }} />
            </Button>
          </StyledToast>
        ),
        { timeout: "persist", position }
      );
    }
  };

  return { toast, notify };
};
