import * as React from "react";
import { Input } from "..";
import Popover, { positionDefault } from "@reach/popover";
import { useForkedRef } from "@reach/utils";

interface IDateTime extends React.ComponentProps<typeof Input> {
  time?: boolean;
  value?: string;
}

export const DateTime = React.forwardRef<HTMLInputElement, IDateTime>((props, forwardedRef) => {
  const { time = true, value = "", ...inputProps } = props;
  const localRef = React.useRef<HTMLInputElement>(null);
  const ref = useForkedRef(forwardedRef, localRef);
  const [popover, setPopover] = React.useState(false);
  return (
    <>
      <Input
        {...inputProps}
        type={"text"}
        ref={ref}
        value={value}
        role="button"
        onClick={() => setPopover(true)}
        onFocus={() => setPopover(true)}
        onKeyDown={({ key, keyCode }) => {
          const isNumber = keyCode >= 48 && keyCode <= 57;
          const isLetter = keyCode >= 65 && keyCode <= 90;
          if (isNumber || isLetter) {
            setPopover(true);
          }
          switch (key) {
            case "Enter":
            case "Space":
            case "ArrowDown":
            case "ArrowRight": {
              setPopover(true);
              break;
            }
            case "Tab":
            case "Escape": {
              setPopover(false);
              break;
            }
          }
        }}
      />
      {popover && (
        <Popover targetRef={localRef} position={positionDefault}>
          <div>
            <p>Whoa! Look at me!</p>
          </div>
        </Popover>
      )}
    </>
  );
});
