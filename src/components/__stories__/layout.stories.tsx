// tslint:disable: jsx-use-translation-function
import * as React from "react";
import { storiesOf } from "@storybook/react";
import {
  Layout,
  ResponsiveLayout,
  Box,
  Label,
  Select,
  Option,
  Button,
  NavLink,
  HeaderLink,
} from "..";
import styled from "../../theme/styled";

storiesOf("Layout", module)
  .add("Manual", () => <Manual />)
  .add("Responsive", () => <Responsive />);

const Area = styled(Box)(() => ({
  width: "100%",
  height: "100%",
}));

const Manual = () => {
  const [mode, setMode] = React.useState<"nav" | "nav-main-aside" | "main-aside">("nav-main-aside");
  return (
    <Layout
      header={<>This is a header</>}
      footer={<>This is a footer</>}
      nav={
        <>
          <Box>This is a navs</Box>
          {mode === "nav" && (
            <>
              <Button onClick={() => setMode("nav-main-aside")}>Nav Main Aside</Button>
              <Button onClick={() => setMode("main-aside")}>Main Aside</Button>
            </>
          )}
        </>
      }
      aside={<>This is aside</>}
      mode={mode}
    >
      <Box display="grid" width="max-content" minWidth="200px" height="100%" m="auto">
        <Box alignSelf="center">
          <Label>Nav</Label>
          <Select onChange={e => setMode(e.target.value as any)} value={mode}>
            <Option value="nav">Nav</Option>
            <Option value="nav-main-aside">Nav Main Aside</Option>
            <Option value="main-aside">Main Side</Option>
          </Select>
        </Box>
      </Box>
    </Layout>
  );
};

const Responsive = () => {
  return (
    <ResponsiveLayout
      header={
        <Box display="grid" gridTemplateColumns="1fr auto">
          <Box>This is a header</Box>
          <Box>
            <HeaderLink href="#1">Link 1</HeaderLink>
            <HeaderLink href="#2">Link 2</HeaderLink>
          </Box>
        </Box>
      }
      footer={<>This is a footer</>}
      nav={
        <>
          <NavLink href="#1">Link 1</NavLink>
          <NavLink href="#2">Link 2</NavLink>
        </>
      }
      aside={<>This is aside</>}
    >
      <>Try me on small devices</>
    </ResponsiveLayout>
  );
};
