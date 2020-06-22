import * as React from "react";
import styled from "../theme/styled";
import { Button, Box } from ".";
import { useTheme } from "../theme";
import { Close } from "..";
import { useTranslation } from "../internationalization";

const StyledPill = styled(Button)<{}>(({ theme: { space } }) => ({
  padding: `${space[1]} ${space[4]}`,
  boxShadow: "unset",
}));

type PillVariant = "primary" | "secondary" | "default" | "info" | "warning" | "danger";

interface IColosablePill extends Omit<React.ComponentProps<typeof PillButton>, "variant"> {
  onClose?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  variant: PillVariant;
}

const enUsPill = { ui: { pill: { close: "Close" } } };
const esArPill = { ui: { pill: { close: "Cerrar" } } };

export const Pill = React.forwardRef<HTMLButtonElement, IColosablePill>((props, ref) => {
  const { children, onClose, variant, ...otherProps } = props;
  const { colors, space, mode } = useTheme();
  const shadowColor = mode === "dark" ? colors.neutral.dark : colors.neutral.darkest;
  const boxShadow = `0 1px 2px ${shadowColor}88, 0 1px 1px ${shadowColor}74`;
  const { t, i18n } = useTranslation();
  i18n.addResourceBundle("en-US", "translation", enUsPill, true, true);
  i18n.addResourceBundle("es-AR", "translation", esArPill, true, true);

  if (!onClose) {
    return (
      <StyledPill
        style={{ boxShadow, borderRadius: space[2] }}
        {...{ variant, children }}
        {...otherProps}
      />
    );
  }

  return (
    <Box
      style={{ boxShadow, borderRadius: space[2] }}
      display="grid"
      gridTemplateColumns="auto 1fr"
    >
      <StyledPill
        style={{
          borderRadius: `${space[2]} 0 0 ${space[2]}`,
          height: "100%",
          display: "flex",
          alignItems: "center",
          margin: "auto 0",
          paddingRight: space[3],
          paddingLeft: space[3],
        }}
        variant={variant}
        borderRightWidth={0}
        borderRadius={space[3]}
        onClick={onClose}
        aria-label={t("ui.pill.close")}
        aria-describedby={otherProps.id}
      >
        <Close width="6" height="6" />
      </StyledPill>
      <StyledPill
        style={{
          borderRadius: `0 ${space[2]} ${space[2]} 0`,
          borderLeftWidth: 0,
          paddingLeft: space[2],
        }}
        {...{ variant, children }}
        {...otherProps}
        ref={ref}
      />
    </Box>
  );
});

const PillButton = styled(Button)(() => ({
  variant: "transparent",
  color: "unset !important",
  display: "flex",
  alignContent: "center",
}));

PillButton.defaultProps = {
  variant: "transparent",
};

Pill.displayName = "Pill";

export default Pill;

type Tag = string | { tag: string; variant: PillVariant };
interface IPillsBox extends React.ComponentProps<typeof Box> {
  selectedTag?: string;
  tags?: Tag[];
  onTagSelected?: (tag: string) => void;
  onTagClosed?: (tag: string) => void;
}

export const PillsBox = React.forwardRef<HTMLDivElement, IPillsBox>((props, ref) => {
  const { space } = useTheme();
  const { tags, selectedTag, onTagClosed, onTagSelected, ...boxProps } = props;

  return (
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      mr={tags && tags.length > 0 ? `-${space[2]}` : undefined}
      mb={tags && tags.length > 0 ? `-${space[2]}` : undefined}
      {...boxProps}
      ref={ref}
    >
      {(tags ?? []).map(t => {
        const value = typeof t === "string" ? t : t.tag;
        const variant = typeof t === "string" ? undefined : t.variant;
        return (
          <Box key={value} width="max-content" mr={space[2]} mb={space[2]}>
            <Pill
              onClick={onTagSelected ? () => onTagSelected(value) : undefined}
              variant={variant || (selectedTag === value ? "primary" : "default")}
              onClose={onTagClosed ? () => onTagClosed(value) : undefined}
            >
              {value}
            </Pill>
          </Box>
        );
      })}
    </Box>
  );
});
