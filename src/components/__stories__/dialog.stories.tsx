import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Dialog } from "../dialog";
import Button from "../button";

storiesOf("Dialog", module).add("From button", () => <Example />);

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
        <Button onClick={close} variant="primary">
          Close
        </Button>
      </Dialog>
    </div>
  );
}
