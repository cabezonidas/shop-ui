// tslint:disable: jsx-use-translation-function
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Form, Label, Input, Box, Button, Shell, Toggle } from "../../components";
import { useToast } from "..";
import { styled } from "../..";

storiesOf("Toasts", module)
  .add("Variants", () => <Variant />)
  .add("Custom", () => <Custom />);

const Toast = styled(Box)`
  margin-right: 16px;
  margin-top: 16px;
  position: relative;
  width: 350px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border: 1px solid #d7d7d7;
  border-radius: 3px;
  background: white;
  box-shadow: 0px 4px 10px 0px #d7d7d7;
  color: #494e5c;
`;

const Custom = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = e.currentTarget.content.value;
    const persisting = !!e.currentTarget.persist.checked;
    const timeout = persisting ? "persist" : e.currentTarget.timeout.value;
    if (persisting) {
      toast(
        ({ close }) => (
          <Toast>
            {content} <Button onClick={() => close()}>Close</Button>
          </Toast>
        ),
        { timeout }
      );
    } else {
      toast(<>{content}</>, { timeout });
    }
  };

  const [persist, setPersist] = React.useState(true);

  return (
    <Shell>
      <Form margin="2" width="350px" display="grid" gridGap="2" onSubmit={handleSubmit}>
        <Box>
          <Label htmlFor="content">Content</Label>
          <Input id="content" defaultValue={"Some toast content"} />
        </Box>
        <Box>
          <Label htmlFor="timeout">Timeout</Label>
          <Input id="timeout" type="number" defaultValue={3000} disabled={persist} />
        </Box>
        <Box>
          <Label htmlFor="persist">Persist</Label>
          <Toggle id="persist" defaultChecked={true} onChange={e => setPersist(e.target.checked)} />
        </Box>
        <Button variant="primary" type="submit">
          Toast!
        </Button>
      </Form>
    </Shell>
  );
};

const Variant = () => {
  const { notify } = useToast();
  const [variant, setVariant] = React.useState<string>("primary");

  const variants = ["primary", "secondary", "default", "info", "warning", "danger"];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    notify(e.currentTarget.content.value, variant as any);
  };

  return (
    <Shell>
      <Form margin="2" width="350px" display="grid" gridGap="2" onSubmit={handleSubmit}>
        <Box>
          <Label htmlFor="content">Content</Label>
          <Input id="content" defaultValue={"Some toast content"} />
        </Box>
        {variants.map(v => (
          <Box key={v}>
            <Label htmlFor={v}>{v}</Label>
            <Toggle
              id={v}
              variant={v as any}
              checked={v === variant}
              onChange={() => setVariant(v)}
            />
          </Box>
        ))}
        <Button variant="primary" type="submit">
          Toast!
        </Button>
      </Form>
    </Shell>
  );
};
