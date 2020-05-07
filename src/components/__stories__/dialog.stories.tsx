import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Dialog } from "../dialog";
import Button from "../button";
import { Box, Label } from "..";
import Form from "../form";
import Input from "../input";

// tslint:disable: jsx-use-translation-function
storiesOf("Dialog", module)
  .add("From button", () => <Example />)
  .add("Dialog content", () => <Example2 />);

function Example() {
  const [showDialog, setShowDialog] = React.useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);
  return (
    <div>
      <Button onClick={open}>Show Dialog</Button>
      <Dialog isOpen={showDialog} onDismiss={close}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut facilis, necessitatibus eius
          ea reprehenderit quis dolores temporibus commodi! Tempore esse voluptate earum corporis et
          quis rem ipsa dicta tenetur molestiae?
        </p>
        <Box display="flex" justifyContent="flex-end" mt="4">
          <Button onClick={close} variant="primary">
            Close
          </Button>
        </Box>
      </Dialog>
    </div>
  );
}
function Example2() {
  const [showDialog, setShowDialog] = React.useState<"body" | "header" | "footer" | "all">(
    undefined
  );
  const close = () => setShowDialog(undefined);

  const [width, setWidth] = React.useState(50);
  const [height, setHeight] = React.useState(50);

  return (
    <div>
      <Button onClick={() => setShowDialog("body")}>Body only</Button>
      <Dialog isOpen={showDialog === "body"} onDismiss={close}>
        This is my content
      </Dialog>
      <Button onClick={() => setShowDialog("header")}>{"Body & Header"}</Button>
      <Dialog isOpen={showDialog === "header"} onDismiss={close} header={"This is a header"}>
        This is my content
      </Dialog>
      <Button onClick={() => setShowDialog("footer")}>Body & footer</Button>
      <Dialog
        isOpen={showDialog === "footer"}
        onDismiss={close}
        footer={<Button onClick={close}>Close</Button>}
      >
        This is my content
      </Dialog>
      <Button onClick={() => setShowDialog("all")}>Body & header & footer</Button>
      <Dialog
        isOpen={showDialog === "all"}
        onDismiss={close}
        header={"This is a header"}
        footer={<Button onClick={close}>Close</Button>}
      >
        This is my content
      </Dialog>
    </div>
  );
}
