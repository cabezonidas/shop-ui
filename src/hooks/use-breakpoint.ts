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
  const isLarge = useMedia(`(min-width: 1024px)`);
  const isMediumLarge = useMedia(`(min-width: 880px)`);
  const isMedium = useMedia(`(min-width: 640px)`);
  const isMediumSmall = useMedia(`(min-width: 420px)`);

  const isHeightLarge = useMedia(`(min-height: 1024px)`);
  const isHeightMediumLarge = useMedia(`(min-height: 880px)`);
  const isHeightMedium = useMedia(`(min-height: 640px)`);
  const isHeightMediumSmall = useMedia(`(min-height: 420px)`);

  const screenWidth = isLarge
    ? `over-1024px`
    : isMediumLarge
    ? `over-880px-less-than-1024px`
    : isMedium
    ? `over-640px-less-than-880px`
    : isMediumSmall
    ? `over-420px-less-than-640px`
    : `less-than-420px`;

  const screenHeight = isHeightLarge
    ? `over-1024px`
    : isHeightMediumLarge
    ? `over-880px-less-than-1024px`
    : isHeightMedium
    ? `over-640px-less-than-880px`
    : isHeightMediumSmall
    ? `over-420px-less-than-640px`
    : `less-than-420px`;

  return {
    isLarge,
    isMediumLarge,
    isMedium,
    isMediumSmall,
    screenWidth,
    screenHeight,
    isHeightLarge,
    isHeightMediumLarge,
    isHeightMedium,
    isHeightMediumSmall,
  };
};
