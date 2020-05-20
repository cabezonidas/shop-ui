import * as React from "react";
import { Shell, Header, Main, Aside, Footer, Nav, Box, Button } from ".";
import { useBreakpoint } from "../hooks";
import styled from "../theme/styled";
import { useTheme } from "../theme/use-theme";

type LayoutMode = "nav" | "nav-main-aside" | "main-aside";
interface ILayout {
  header?: React.ReactNode;
  nav?: React.ReactNode;
  aside?: React.ReactNode;
  footer?: React.ReactNode;
  mode?: LayoutMode;
  shouldCloseNav?: () => void;
}

export const Layout: React.FC<ILayout> = ({
  mode = "nav-main-aside",
  header,
  nav,
  aside,
  footer,
  children,
  shouldCloseNav,
}) => {
  const transition = "width 0.3s ease";
  const { colors, mode: darkMode } = useTheme();

  const shadowColor = darkMode === "dark" ? colors.neutral.dark : colors.neutral.darkest;
  const boxShadow = `0 1px 2px ${shadowColor}88, 0 1px 1px ${shadowColor}74`;
  return (
    <Shell display="grid" gridTemplateRows="auto 1fr auto">
      <Header
        bg={colors.primary.mediumDark}
        color={colors.neutral.lightest}
        zIndex={1}
        style={{ boxShadow }}
      >
        {header}
      </Header>
      <Box display="flex" overflow="hidden" zIndex={0}>
        <Nav
          bg={darkMode === "dark" ? colors.neutral.dark : colors.secondary.medium}
          color={darkMode === "dark" ? colors.neutral.lightest : colors.neutral.darkest}
          overflow="hidden"
          width={mode === "main-aside" ? "0%" : "100%"}
          maxWidth={mode === "nav" ? "100%" : "max-content"}
          style={{ transition, boxShadow, whiteSpace: "nowrap", textOverflow: "ellipsis" }}
          zIndex={1}
          onClick={() => {
            if (mode === "nav" && shouldCloseNav) {
              shouldCloseNav();
            }
          }}
        >
          {nav}
        </Nav>
        <Main
          overflow="auto"
          zIndex={0}
          width={mode === "nav" ? "0%" : "100%"}
          style={{ transition }}
        >
          {children}
        </Main>
        <Aside
          overflow="auto"
          width={mode === "nav" ? "0%" : "100%"}
          maxWidth={mode === "nav" ? "0%" : "max-content"}
          style={{ transition }}
        >
          {aside}
        </Aside>
      </Box>
      <Footer bg={colors.primary.mediumDark} color={colors.neutral.lightest}>
        {footer}
      </Footer>
    </Shell>
  );
};

Layout.displayName = "Layout";

const getNavState = () => {
  const state = localStorage?.getItem("nav-state");
  return ["nav", "nav-main-aside", "main-aside"].find(s => s === state) as LayoutMode | undefined;
};
const setNavState = (state: string) => {
  if (localStorage) {
    localStorage.setItem("nav-state", state);
  }
};

export const ResponsiveLayout: React.FC<Omit<ILayout, "mode" | "shouldCloseNav">> = ({
  header,
  nav,
  aside,
  footer,
  children,
}) => {
  const [mode, setMode] = React.useState<LayoutMode>(getNavState() ?? "main-aside");

  const { isMediumSmall } = useBreakpoint();

  React.useEffect(() => {
    if (!isMediumSmall) {
      setMode("main-aside");
    } else {
      if (mode === "nav") {
        setMode("nav-main-aside");
      }
    }
  }, [isMediumSmall]);

  React.useEffect(() => {
    setNavState(mode);
  }, [mode]);

  const headerWithBurgerMenu = (
    <Box display="grid" gridTemplateColumns="auto 1fr">
      <MenuButton
        variant="transparent"
        onClick={() => {
          if (!isMediumSmall) {
            setMode(m => (m === "nav" ? "main-aside" : "nav"));
          } else {
            setMode(m => (m === "main-aside" ? "nav-main-aside" : "main-aside"));
          }
        }}
      >
        <Top isOpen={mode !== "main-aside"} />
        <Middle isOpen={mode !== "main-aside"} />
        <Bottom isOpen={mode !== "main-aside"} />
      </MenuButton>
      <Box alignSelf="center">{header}</Box>
    </Box>
  );

  return (
    <Layout
      header={headerWithBurgerMenu}
      footer={footer}
      nav={nav}
      aside={aside}
      mode={mode}
      shouldCloseNav={() => setMode("main-aside")}
    >
      {children}
    </Layout>
  );
};

ResponsiveLayout.displayName = "ResponsiveLayout";

const MenuButton = styled(Button)(({ theme }) => ({
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.space[3],
  appearance: "none",
  overflow: "hidden",
}));

const Line = styled(Box)<{ isOpen: boolean }>(({ theme }) => ({
  height: theme.space[1],
  width: "20px",
  transition: "all 0.2s ease",
  borderRadius: theme.space[5],
}));

const Top = styled(Line)(({ theme, isOpen }) => ({
  transform: isOpen ? "translateX(4px) rotate(45deg)" : "none",
  transformOrigin: "top left",
  marginBottom: theme.space[1],
  backgroundColor: theme.colors.neutral.lightest,
}));

const Middle = styled(Line)(({ theme, isOpen }) => ({
  transform: isOpen ? "translateX(-16px)" : "none",
  backgroundColor: theme.colors.neutral.lightest,
  opacity: isOpen ? 0 : 1,
}));

const Bottom = styled(Line)(({ theme, isOpen }) => ({
  transform: isOpen ? "translateX(2px) rotate(-45deg)" : "none",
  transformOrigin: "top left",
  marginTop: theme.space[1],
  backgroundColor: theme.colors.neutral.lightest,
}));
