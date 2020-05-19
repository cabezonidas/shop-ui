// tslint:disable: jsx-use-translation-function
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Layout, Box, Label, Select, Option, Button } from "..";

storiesOf("Layout", module).add("Variants", () => <MyStory />);

const MyStory = () => {
  const [mode, setMode] = React.useState<"nav" | "nav-main-aside" | "main-aside">("nav-main-aside");
  return (
    <Layout
      header={<>This is a header</>}
      footer={<>This is a footer</>}
      nav={
        <Box>
          <Box>This is a navs</Box>
          {mode === "nav" && (
            <>
              <Button onClick={() => setMode("nav-main-aside")}>Nav Main Aside</Button>
              <Button onClick={() => setMode("main-aside")}>Main Aside</Button>
            </>
          )}
        </Box>
      }
      aside={<>This is a aside</>}
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
