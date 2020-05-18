import * as React from "react";
import { Input, Box } from "..";
import styled from "../theme/styled";
import { MinutesInterval, DayCalendar, DateTimeCalendar, TimeCalendar } from "./calendar";
import Popover, { positionDefault } from "@reach/popover";
import { useForkedRef } from "@reach/utils";
import { DateTime, Interval } from "luxon";
import FocusLock from "react-focus-lock";
import { createPortal } from "react-dom";

interface IDatePicker extends React.ComponentProps<typeof Input> {
  day?: DateTime;
  onDaySelect: (d?: DateTime) => void;
  placeholderDay?: DateTime;
  allowedIntervals?: Interval[];
  mode?: "day" | "date-time" | "time";
  minutesInterval?: MinutesInterval;
}

export const DatePicker = React.forwardRef<HTMLInputElement, IDatePicker>((props, forwardedRef) => {
  const {
    day,
    onDaySelect,
    placeholderDay,
    allowedIntervals,
    mode = "day",
    minutesInterval = 60,
    ...inputProps
  } = props;
  const localRef = React.useRef<HTMLInputElement>(null);
  const ref = useForkedRef(forwardedRef, localRef);
  const [popover, setPopover] = React.useState(false);

  const value = React.useMemo(() => day || placeholderDay || DateTime.local(), [
    day,
    placeholderDay,
  ]);

  const initialFocusRef = React.useRef<HTMLButtonElement>(null);

  const popoverProps = {
    day: value,
    onDaySelect: (d?: DateTime) => {
      onDaySelect(d);
      setPopover(false);
    },
    initialFocusRef,
    allowedIntervals,
    minutesInterval,
  };

  return (
    <>
      <Input
        {...inputProps}
        type={"text"}
        ref={ref}
        value={
          day?.toLocaleString(mode === "day" ? DateTime.DATE_MED : DateTime.DATETIME_MED) ?? ""
        }
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
                  <Popup my="2" p="3">
                    {(() => {
                      switch (mode) {
                        case "day": {
                          return <DayCalendar {...popoverProps} />;
                        }
                        case "date-time": {
                          return <DateTimeCalendar {...popoverProps} />;
                        }
                        case "time": {
                          return <TimeCalendar {...popoverProps} />;
                        }
                      }
                    })()}
                  </Popup>
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

const Popup = styled(Box)(({ theme: { colors, mode } }) => {
  const bg = mode === "dark" ? colors.neutral.darkest : colors.neutral.lightest;
  const shadow = mode === "dark" ? colors.neutral.medium : colors.neutral.medium;
  return {
    background: bg,
    boxShadow: `0 1px 2px ${shadow}88, 0 1px 1px ${shadow}74`,
  };
});
