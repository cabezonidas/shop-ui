import * as React from "react";
import VisuallyHidden from "@reach/visually-hidden";
import { Menu, MenuList, MenuButton, MenuItem } from "@reach/menu-button";
import { Button } from "../components";
import { useTranslation } from "../internationalization";
import styled from "./styled";

const StyledMenuButton = Button.withComponent(MenuButton);

export const LanguageButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof StyledMenuButton>
>((props, ref) => {
  const { languages, i18n } = useTranslation();
  return (
    <Menu>
      <StyledMenuButton variant="transparent" ref={ref} {...props}>
        {getFlag(i18n.language)} <VisuallyHidden>{i18n.language}</VisuallyHidden>
      </StyledMenuButton>
      <StyledMenuList>
        {languages.map(l => (
          <StyledMenuItem
            key={l.localeId}
            onSelect={() => i18n.changeLanguage(l.localeId)}
            children={(() => {
              const nameSuffix = l.name.split(" ")[0];
              const flag = getFlag(l.localeId);
              return flag ? `${flag} ${nameSuffix}` : nameSuffix;
            })()}
          />
        ))}
      </StyledMenuList>
    </Menu>
  );
});

export const getFlag = (localeId: string) =>
  localeId
    .split("-")[1]
    ?.toUpperCase()
    .replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397));

const StyledMenuList = styled(MenuList)`
  &[data-reach-menu-list] {
    padding: 0;
  }
`;

const StyledMenuItem = styled(MenuItem)`
  &[data-reach-menu-item] {
    padding: 10px;
  }
  &[data-reach-menu-item][data-selected] {
    background: ${props => props.theme.colors.primary.dark};
    color: ${props => props.theme.colors.neutral.lightest};
  }
`;
