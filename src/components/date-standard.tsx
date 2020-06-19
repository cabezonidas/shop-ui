import * as React from "react";
import { Input } from ".";
import { DateTime } from "luxon";

interface IDateStandard
  extends Omit<React.ComponentProps<typeof Input>, "value" | "onChange" | "defaultValue"> {
  value?: DateTime;
  defaultValue?: DateTime;
  onChange?: (d?: DateTime) => void;
}

export const DateStandard = React.forwardRef<HTMLInputElement, IDateStandard>(
  (props, forwardedRef) => {
    const { value, onChange, defaultValue, ...inputProps } = props;

    return (
      <Input
        type="date"
        ref={forwardedRef}
        defaultValue={defaultValue?.toFormat("yyyy-LL-dd") ?? undefined}
        value={value?.toFormat("yyyy-LL-dd") ?? (onChange ? "" : undefined)}
        onChange={
          onChange
            ? e => {
                if (!e.target.value) {
                  onChange(undefined);
                } else {
                  try {
                    const newValue = DateTime.fromFormat(e.target.value, "yyyy-LL-dd");
                    const { year, month, day } = newValue;
                    onChange(value?.set({ year, month, day }) ?? newValue);
                  } catch {
                    onChange(undefined);
                  }
                }
              }
            : undefined
        }
        style={{ paddingRight: 4 }}
        {...inputProps}
      />
    );
  }
);

DateStandard.displayName = "DateStandard";
