import * as React from "react";
import { animated, useTransition } from "react-spring";
import { Box, Button } from "../..";
import styled from "../styled";

type ToastVariant = "primary" | "success" | "default" | "info" | "warning" | "danger";
type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";
type ToastChildren = React.ReactNode | ((e: { close: () => void }) => React.ReactNode);
interface IToast {
  id: number;
  notification: ToastChildren;
  options?: IToastOptions;
}
interface IToastOptions {
  timeout?: number | "persist";
  position?: ToastPosition;
}

export const useToast = () => {
  const { toast } = React.useContext(ToastContext);
  const notify = React.useCallback(
    (
      message: string,
      options?: {
        variant?: ToastVariant;
        position?: ToastPosition;
      }
    ) => {
      const variant = options?.variant ?? "primary";
      const position = options?.position ?? "top-center";
      toast(styleToastBox(variant, message), {
        timeout: variant === "success" ? 3000 : "persist",
        position,
      });
    },
    [toast]
  );

  return {
    toast,
    notify,
  };
};

export const ToastProvider: React.FC<{ defaultTimeout?: number; stack?: number }> = ({
  children,
  defaultTimeout = 3000,
  stack = 3,
}) => {
  const [state, setState] = React.useState({ toasts: [] as IToast[], key: 0 });
  const toast = React.useCallback(
    (notification: ToastChildren, options?: IToastOptions) => {
      setState(oldState => {
        const newArr = [...oldState.toasts, { id: oldState.key, notification, options }];
        // Take out the last item
        const newToasts = new Array(Math.min(stack, newArr.length))
          .fill(undefined)
          .map((_, i) => i)
          .map(i => newArr[newArr.length - 1 - i])
          .reverse();
        return { key: oldState.key + 1, toasts: newToasts };
      });
    },
    [stack]
  );

  const removeToast = React.useCallback((id: number) => {
    setState(oldState => {
      return {
        toasts: oldState.toasts.filter(t => t.id !== id),
        key: oldState.key + 1,
      };
    });
  }, []);

  return (
    <>
      <ToastPortal {...{ defaultTimeout, state, removeToast }} />
      <MemoizedProvider {...{ toast, children }} />
    </>
  );
};
ToastProvider.displayName = "ToastProvider";

const MemoizedProvider: React.FC<{
  toast: (t: ToastChildren, options?: IToastOptions) => void;
}> = React.memo(({ toast, children }) => {
  return <ToastContext.Provider value={{ toast }}>{children}</ToastContext.Provider>;
});

const ToastPortal: React.FC<{
  defaultTimeout: number;
  removeToast: (id: number) => void;
  state: { toasts: IToast[]; key: number };
}> = ({ defaultTimeout, state, removeToast }) => {
  const reducedToasts = React.useMemo(() => {
    return state.toasts.reduce(
      // eslint-disable-next-line array-callback-return
      (res, item) => {
        const position = item?.options?.position ?? "bottom-right";
        // eslint-disable-next-line default-case
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const topLeft = useTransition(reducedToasts.topLeft, transition("left"));
  const topCenter = useTransition(reducedToasts.topCenter, transition("top"));
  const topRight = useTransition(reducedToasts.topRight, transition("right"));
  const bottomLeft = useTransition(reducedToasts.bottomLeft, transition("left"));
  const bottomCenter = useTransition(reducedToasts.bottomCenter, transition("bottom"));
  const bottomRight = useTransition(reducedToasts.bottomRight, transition("right"));

  return (
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
    </>
  );
};
ToastPortal.displayName = "ToastPortal";

const ToastContext = React.createContext<{
  toast: (styledToast: ToastChildren, options?: IToastOptions) => void;
}>(undefined as any);

const ToastContainer = styled(Box)(() => ({
  pointerEvents: "none",
  overflow: "hidden",
  position: "absolute",
  zIndex: 9999,
  padding: `14px`,
  display: "flex",
  flexDirection: "column",
  maxWidth: "100%",
}));
ToastContainer.displayName = "ToastContainer";

const AnimatedToast = animated(
  styled(Box)(() => ({
    pointerEvents: "all",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    maxWidth: "100%",
  }))
);
AnimatedToast.displayName = "AnimatedToast";

const InnerToast: React.FC<{
  t: IToast;
  removeToast: (id: number) => void;
  defaultTimeout: number;
}> = props => {
  const { t, removeToast, defaultTimeout } = props;
  const expiry = React.useMemo(
    () =>
      t.options === undefined || t.options.timeout === undefined
        ? defaultTimeout
        : t.options.timeout === "persist"
        ? undefined
        : t.options.timeout,
    [t.options, defaultTimeout]
  );

  const close = React.useCallback(() => removeToast(t.id), [removeToast, t.id]);

  return (
    <ToastTimeout removeToast={close} expiry={expiry}>
      {typeof t.notification === "function" ? t.notification({ close }) : t.notification}
    </ToastTimeout>
  );
};
InnerToast.displayName = "InnerToast";

const ToastTimeout: React.FC<{ removeToast: () => void; expiry?: number }> = props => {
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

const ToastBox = styled(Button.withComponent("div"))(({ theme: { space, colors }, variant }) => {
  return {
    minWidth: 300,
    maxWidth: 300,
    whiteSpace: "normal",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "inherit",
    marginBottom: space[4],
    marginLeft: "auto",
    marginRight: "auto",
    padding: "5px",
    border: `1px solid ${colors.neutral.light}`,
    borderRadius: "5px",
    boxShadow: "rgba(39,50,63,0.1) -5px 10px 10px -5px",
    minHeight: "47px",
    cursor: "default",
  };
});
ToastBox.displayName = "ToastBox";

const styleToastBox = (variant: ToastVariant, message: string) => (e: { close: () => void }) => (
  <ToastBox variant={variant}>
    <Box display="grid" overflow="hidden" gridTemplateColumns="auto 1fr">
      {(() => {
        switch (variant) {
          case "warning":
          case "danger":
            return <ExclamationIcon />;
          case "success":
            return <SuccessIcon />;
          case "info":
            return <InfoIcon />;
          default:
            return <Box width="1.5rem" />;
        }
      })()}
      <Box overflow="hidden" alignSelf="center" style={{ textOverflow: "ellipsis" }}>
        {message}
      </Box>
    </Box>
    <Button
      variant="transparent"
      color="inherit !important"
      onClick={() => e.close()}
      px="1"
      py="0"
      height="max-content"
      alignSelf="center"
    >
      <CloseIcon />
    </Button>
  </ToastBox>
);

const transition = (place: "left" | "right" | "top" | "bottom") => {
  const maxHeight = "999px";
  if (place === "top" || place === "bottom") {
    return {
      from: {
        transform: `translate3d(0,${place === "top" ? "-" : ""}100%,0)`,
        opacity: 0,
        maxHeight,
      },
      enter: { transform: `translate3d(0,0px,0)`, opacity: 1, maxHeight },
      leave: {
        transform: `translate3d(0,${place === "top" ? "-" : ""}100%,0)`,
        opacity: 0,
        maxHeight: "0px",
      },
    };
  }
  return {
    from: { [place]: "-100%", opacity: 0, maxHeight },
    enter: { [place]: "0%", opacity: 1, maxHeight },
    leave: { [place]: "-100%", opacity: 0, maxHeight: "0px" },
  };
};

const ExclamationIcon = () => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 31 30"
      fill="currentColor"
      style={{ margin: "0 1rem", alignSelf: "center" }}
    >
      <path
        fillRule="evenodd"
        d="M15.5 30C24.0604 30 31 23.2843 31 15C31 6.71573 24.0604 0 15.5 0C6.93959 0 0 6.71573 0 15C0 23.2843 6.93959 30 15.5 30ZM18.4291 5.55122L17.6776 12.4225C17.6776 13.3155 17.6226 14.2012 17.5124 15.0797C17.4023 15.9581 17.2571 16.8536 17.0769 17.766H13.923C13.7428 16.8536 13.5976 15.9581 13.4875 15.0797C13.3773 14.2012 13.3222 13.3155 13.3222 12.4225L12.5708 5.55122H18.4291ZM13.0145 22.0465C12.8793 22.3474 12.8117 22.6726 12.8117 23.022C12.8117 23.3714 12.8793 23.699 13.0145 24.0048C13.1497 24.3106 13.3349 24.5751 13.5702 24.7983C13.8055 25.0216 14.0833 25.1963 14.4037 25.3225C14.7241 25.4487 15.0745 25.5117 15.455 25.5117C15.8255 25.5117 16.1709 25.4487 16.4913 25.3225C16.8117 25.1963 17.092 25.0216 17.3323 24.7983C17.5726 24.5751 17.7604 24.3106 17.8955 24.0048C18.0307 23.699 18.0983 23.3714 18.0983 23.022C18.0983 22.6726 18.0307 22.3474 17.8955 22.0465C17.7604 21.7456 17.5726 21.4835 17.3323 21.2603C17.092 21.037 16.8117 20.8599 16.4913 20.7288C16.1709 20.5978 15.8255 20.5323 15.455 20.5323C15.0745 20.5323 14.7241 20.5978 14.4037 20.7288C14.0833 20.8599 13.8055 21.037 13.5702 21.2603C13.3349 21.4835 13.1497 21.7456 13.0145 22.0465Z"
      />
    </svg>
  );
};

const InfoIcon = () => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 31 30"
      fill="currentColor"
      style={{ margin: "0 1rem", alignSelf: "center" }}
    >
      <g clipPath="url(#clip0)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.4999 0C6.93947 0 -0.000121322 6.71573 -0.00012207 15C-0.000122819 23.2843 6.93946 30 15.4999 30C24.0603 30 30.9999 23.2843 30.9999 15C30.9999 6.71573 24.0603 0 15.4999 0ZM13.395 11.9753H17.86V24.5679H13.395V11.9753ZM17.9856 7.95334C18.1207 7.65244 18.1883 7.32727 18.1883 6.97783C18.1883 6.62839 18.1207 6.3008 17.9856 5.99504C17.8504 5.68928 17.6652 5.42477 17.4299 5.20152C17.1946 4.97827 16.9167 4.80355 16.5963 4.67737C16.2759 4.55118 15.9255 4.48809 15.545 4.48809C15.1746 4.48809 14.8292 4.55118 14.5088 4.67736C14.1884 4.80355 13.908 4.97827 13.6677 5.20152C13.4274 5.42477 13.2397 5.68928 13.1045 5.99504C12.9693 6.3008 12.9018 6.62839 12.9018 6.97783C12.9018 7.32727 12.9693 7.65244 13.1045 7.95334C13.2397 8.25425 13.4274 8.51632 13.6677 8.73958C13.908 8.96283 14.1884 9.13997 14.5088 9.27101C14.8292 9.40205 15.1746 9.46757 15.545 9.46757C15.9255 9.46757 16.2759 9.40205 16.5963 9.27101C16.9167 9.13997 17.1946 8.96283 17.4299 8.73958C17.6652 8.51632 17.8504 8.25425 17.9856 7.95334Z"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="31" height="30" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const SuccessIcon = () => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 32 30"
      fill="currentColor"
      style={{ margin: "0 1rem", alignSelf: "center" }}
    >
      <path d="M16 30C24.8366 30 32 23.2843 32 15C32 6.71573 24.8366 0 16 0C7.16344 0 0 6.71573 0 15C0 23.2843 7.16344 30 16 30ZM9.1769 12.6597L14.1746 17.2651L11.0553 20.1396L6.05763 15.5342L9.1769 12.6597ZM14.1746 17.2651L23.5324 8.64194L26.8642 11.7122L14.3872 23.2098L11.0554 20.1396L14.1746 17.2651Z" />
    </svg>
  );
};

const CloseIcon = () => {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 13 12"
      fill="currentColor"
      style={{ margin: "0 1px", alignSelf: "center" }}
    >
      <rect
        width="14.1506"
        height="2.5269"
        rx="1"
        transform="matrix(0.714555 0.699579 -0.714555 0.699579 1.80563 0)"
      />
      <rect
        width="14.1506"
        height="2.5269"
        rx="1"
        transform="matrix(-0.714555 0.699579 0.714555 0.699579 10.1114 0)"
      />
    </svg>
  );
};
