import * as React from "react";
import { Shell, Header, Main, Aside, Footer, Nav, Box } from "..";

type LayoutMode = "nav" | "nav-main-aside" | "main-aside";
interface ILayout {
  header?: React.ReactNode;
  nav?: React.ReactNode;
  aside?: React.ReactNode;
  footer?: React.ReactNode;
  mode?: LayoutMode;
}

export const Layout: React.FC<ILayout> = ({
  mode = "nav-main-aside",
  header,
  nav,
  aside,
  footer,
  children,
}) => {
  const transition = "width 0.3s ease";

  return (
    <Shell display="grid" gridTemplateRows="auto 1fr auto">
      <Header bg="hotpink">{header}</Header>
      <Box display="flex" overflow="hidden">
        <Nav
          bg="papayawhip"
          overflow="hidden"
          width={mode === "main-aside" ? "0%" : "100%"}
          maxWidth={mode === "nav" ? "100%" : "max-content"}
          style={{ transition }}
        >
          {nav}
        </Nav>
        <Main
          bg="orange"
          overflow="auto"
          width={mode === "nav" ? "0%" : "100%"}
          style={{ transition }}
        >
          {children}
        </Main>
        <Aside
          bg="red"
          overflow="auto"
          width={mode === "nav" ? "0%" : "100%"}
          maxWidth={mode === "nav" ? "0%" : "max-content"}
          style={{ transition }}
        >
          {aside}
        </Aside>
      </Box>
      <Footer bg="grey"> {footer}</Footer>
    </Shell>
  );
};

Layout.displayName = "Layout";
