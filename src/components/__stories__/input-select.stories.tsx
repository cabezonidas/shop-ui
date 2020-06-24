import * as React from "react";
import { storiesOf } from "@storybook/react";
import { InputSelect, Form, Button, Label, PillsBox } from "..";
import Box from "../box";

const options1 = [
  {
    id: "123",
    value: "prueba",
  },
  {
    id: "456",
    value: "test",
    children: (
      <Box p="4" bg="hotpint" onClick={() => alert(456)}>
        Don't click me
      </Box>
    ),
  },
];

const options2 = ["this is a test", "here there are many options"];

storiesOf("Input select", module)
  .add("Tags", () => <TagsExample />)
  .add("Complex children", () => (
    <Box width="100px">
      <InputSelect options={options1} />
    </Box>
  ))
  .add("Simple children", () => <InputSelect options={options2} />);

const TagsExample = () => {
  const [collection, setCollection] = React.useState([
    "test",
    "tag1",
    "seb",
    "boy",
    "head",
    "miguecinho",
    "test2",
    "tag2",
    "seb2",
    "boy2",
    "head2",
    "miguecinho2",
  ]);
  const [selected, setSelected] = React.useState(collection.filter((_, i) => i < 3));

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        alert("submitted");
      }}
      width="200px"
      // height="100vh"
      // gridTemplateRows="auto 1fr auto"
    >
      <Box>
        <Label htmlFor="select">Select tags</Label>
        <InputSelect
          id="select"
          options={collection}
          onOptionSelected={o => !selected.includes(o) && setSelected(s => [...s, o])}
        />
        {selected.length > 0 && (
          <PillsBox
            mt="1"
            tags={selected}
            onTagClosed={t => setSelected(s => s.filter(tag => tag !== t))}
          />
        )}
      </Box>
      <Button variant="primary">Submit</Button>
      {/* <Box>
        <Label htmlFor="select">Select tags</Label>
        <InputSelect
          id="select"
          options={collection}
          onOptionSelected={o => !selected.includes(o) && setSelected(s => [...s, o])}
        />
      </Box> */}
    </Form>
  );
};
