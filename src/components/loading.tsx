import * as React from "react";
import { styled } from "../theme";
import { Box } from ".";
import { keyframes } from "@emotion/core";
import { useTranslation } from "react-i18next";

const enUsLoading = { ui: { loading: "Loading" } };
const esArLoading = { ui: { loading: "Cargando" } };

export const Loading = () => {
  const { t, i18n } = useTranslation();
  i18n.addResourceBundle("en-US", "translation", enUsLoading, true, true);
  i18n.addResourceBundle("es-AR", "translation", esArLoading, true, true);

  const text = `${t("ui.loading")}...`;

  return (
    <Box display="grid" gridTemplateColumns={`repeat(4, auto)`} gridGap="0">
      <Box>{t("ui.loading")}</Box>
      <Dot index={0}>.</Dot>
      <Dot index={1}>.</Dot>
      <Dot index={2}>.</Dot>
    </Box>
  );
};

const Dot = styled(Box)<{ index: number }>(({ index }) => ({
  borderRadius: "50%",
  animation: `0.9s ${bounce} infinite alternate`,
  animationDelay: `${0.3 * index}s`,
}));

const bounce = keyframes`
to {
  opacity: 0.6;
}
`;
