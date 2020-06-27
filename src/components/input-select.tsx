import * as React from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
  ComboboxProps,
} from "@reach/combobox";
import styled from "../theme/styled";
import Input from "./input";
import matchSorter from "match-sorter";
import { useTheme } from "../theme/use-theme";
import { useForkedRef } from "@reach/utils";
import { useRect } from "@reach/rect";

interface IKeyValuePair {
  id?: string | number;
  value: string;
  children?: React.ReactNode;
}

type Option = IKeyValuePair | string;

interface IInputSelect extends React.ComponentProps<typeof StyledComboboxInput> {
  comboboxProps?: Omit<ComboboxProps, "children" | "onSelect">;
  options?: Option[];
  onOptionSelected?: (value: string) => void;
}

export const InputSelect = React.forwardRef<HTMLInputElement, IInputSelect>(
  (props, forwardedRef) => {
    const { options, onOptionSelected, comboboxProps, ...otherProps } = props;

    const [inputValue, setInputValue] = React.useState(
      typeof otherProps.value === "string" ? otherProps.value : undefined
    );

    const localOptions = matchSorter(
      options?.map(o => (typeof o === "string" ? { id: o, value: o } : o)) ?? [],
      inputValue ?? "",
      { keys: ["id", "value"] }
    );

    const { onChange, ...inputProps } = otherProps;

    const {
      colors: { neutral },
    } = useTheme();

    const localRef = React.useRef<HTMLInputElement>(null);
    const ref = useForkedRef(forwardedRef, localRef);
    const rect = useRect(localRef);

    const comboboxOptionStyle = { padding: "10px", wordBreak: "break-word" };

    return (
      <Combobox {...comboboxProps} onSelect={onOptionSelected}>
        <StyledComboboxInput
          {...inputProps}
          ref={ref}
          onChange={e => {
            setInputValue(e.target.value);
            if (onChange) {
              onChange(e);
            }
          }}
        />

        <ComboboxPopover
          style={{
            minWidth: "100px",
            width: "max-content",
            maxWidth: rect ? rect.width - 2 : undefined,
            color: neutral.darkest,
          }}
        >
          <ComboboxList style={{ margin: "10px 0" }}>
            {localOptions.map((o, i) => (
              <ComboboxOption key={i} value={o.value} style={comboboxOptionStyle}>
                {o.children || <ComboboxOptionText />}
              </ComboboxOption>
            ))}
            {inputValue && !localOptions.find(o => o.value === inputValue) && (
              <>
                <ComboboxOption value={inputValue} style={comboboxOptionStyle}>
                  <ComboboxOptionText />
                </ComboboxOption>
              </>
            )}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    );
  }
);

const StyledComboboxInput = styled(Input.withComponent(ComboboxInput))``;
