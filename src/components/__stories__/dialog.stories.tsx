import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Dialog } from "../dialog";
import Button from "../button";

// tslint:disable: jsx-use-translation-function
storiesOf("Dialog", module).add("Variants", () => <Example />);

function Example() {
  const [showDialog, setShowDialog] = React.useState<
    "body" | "header" | "footer" | "all" | undefined
  >(undefined);
  const close = () => setShowDialog(undefined);

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
