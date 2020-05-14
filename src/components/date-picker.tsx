import * as React from "react";
import { Input, Form, Calendar } from "..";
import Popover, { positionDefault } from "@reach/popover";
import { useForkedRef } from "@reach/utils";
import { DateTime } from "luxon";

interface IDatePicker extends React.ComponentProps<typeof Input> {
  day?: DateTime;
  onDaySelect: (d: DateTime) => void;
  placeholderDay?: DateTime;
}

export const DatePicker = React.forwardRef<HTMLInputElement, IDatePicker>((props, forwardedRef) => {
  const { day, onDaySelect, placeholderDay, ...inputProps } = props;
  const localRef = React.useRef<HTMLInputElement>(null);
  const ref = useForkedRef(forwardedRef, localRef);
  const [popover, setPopover] = React.useState(false);

  const value = React.useMemo(() => day || placeholderDay || DateTime.local(), [
    day,
    placeholderDay,
  ]);

  return (
    <>
      <Input
        {...inputProps}
        type={"text"}
        ref={ref}
        value={day?.toLocaleString(DateTime.DATE_MED) ?? ""}
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
            case "Backspace": {
              setPopover(true);
              onDaySelect(undefined);
            }
          }
        }}
      />
      {popover && (
        <Popover targetRef={localRef} position={positionDefault}>
          <Form>
            <Calendar
              day={value}
              onDaySelect={d => {
                onDaySelect(d);
                setPopover(false);
              }}
            />
          </Form>
        </Popover>
      )}
    </>
  );
});
