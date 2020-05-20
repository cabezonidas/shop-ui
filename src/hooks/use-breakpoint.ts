import * as React from "react";
const isClient = typeof window === "object";

const useMedia = (query: string, defaultState: boolean = false) => {
  const [state, setState] = React.useState(
    isClient ? () => window.matchMedia(query).matches : defaultState
  );

  React.useEffect(() => {
    let mounted = true;
    const mql = window.matchMedia(query);
    const onChange = () => {
      if (!mounted) {
        return;
      }
      setState(!!mql.matches);
    };

    mql.addListener(onChange);
    setState(mql.matches);

    return () => {
      mounted = false;
      mql.removeListener(onChange);
    };
  }, [query]);

  return state;
};

export const useBreakpoint = () => {
  const isLarge = useMedia("(min-width: 1024px)");
  const isMediumLarge = useMedia("(min-width: 880px)");
  const isMedium = useMedia("(min-width: 640px)");
  return { isLarge, isMediumLarge, isMedium };
};
