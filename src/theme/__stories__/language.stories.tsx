import * as React from "react";
import { Box, LanguageButton } from "../..";
import { storiesOf } from "@storybook/react";
import { useTranslation } from "../../internationalization";
import { Label, Select, Option } from "../../components";

storiesOf("Language", module).add("Language", () => <Language />);

const Language = () => {
  const { t, languages, i18n } = useTranslation();

  i18n.addResourceBundle("en-US", "translation", { story: { label: "Language" } }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { story: { label: "Lenguaje" } }, true, true);

  return (
    <Box display="grid" gridGap="4">
      <Box>
        <Label children={t("story.label")} />
        <Select value={i18n.language} onChange={e => i18n.changeLanguage(e.target.value)}>
          {languages.map(l => (
            <Option key={l.localeId} value={l.localeId} children={l.name} />
          ))}
        </Select>
      </Box>
      <LanguageButton />
    </Box>
  );
};
