import * as React from "react";
import { Input, Calendar, Box } from "..";
import Popover, { positionDefault } from "@reach/popover";
import { useForkedRef } from "@reach/utils";
import { DateTime } from "luxon";
import FocusLock from "react-focus-lock";
import { createPortal } from "react-dom";

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

  const initialFocusRef = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      <Input
        {...inputProps}
        type={"text"}
        ref={ref}
        value={day?.toLocaleString(DateTime.DATE_MED) ?? ""}
        onChange={() => ({})}
        role="button"
        onClick={() => setPopover(true)}
        onKeyDown={({ key, keyCode }) => {
          const isNumber = keyCode >= 48 && keyCode <= 57;
          const isLetter = keyCode >= 65 && keyCode <= 90;
          if (isNumber || isLetter) {
            setPopover(true);
          }
          switch (key) {
            case "Space":
            case "ArrowDown":
            case "ArrowRight": {
              setPopover(true);
              break;
            }
            case "Backspace": {
              onDaySelect(undefined);
            }
          }
        }}
      />
      {popover && (
        <>
          {createPortal(
            <Box
              position="absolute"
              top={0}
              right={0}
              bottom={0}
              left={0}
              bg="transparent"
              onClick={() => setPopover(false)}
              onKeyDown={({ key }) => {
                if (key === "Escape") {
                  setPopover(false);
                }
              }}
            >
              <Popover
                targetRef={localRef}
                position={positionDefault}
                onClick={e => e.stopPropagation()}
              >
                <FocusLock
                  autoFocus={true}
                  returnFocus={true}
                  onActivation={() => initialFocusRef.current?.focus()}
                >
                  <Calendar
                    day={value}
                    onDaySelect={d => {
                      onDaySelect(d);
                      setPopover(false);
                    }}
                    initialFocusRef={initialFocusRef}
                  />
                </FocusLock>
              </Popover>
            </Box>,
            document.body
          )}
        </>
      )}
    </>
  );
});
