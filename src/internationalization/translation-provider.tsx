import { useContext } from "react";
import * as React from "react";
import { useTranslation as useTranslationNext } from "react-i18next";
import { TFunction, i18n as i18nObject } from "i18next";

interface ILanguage {
  localeId: string;
  name: string;
}

interface II18nContext {
  t: TFunction;
  c: (num: number, currencyCode?: string) => string;
  n: (num: number) => string;
  i18n: i18nObject;
  languages: ILanguage[];
}

const TranslationContext = React.createContext<II18nContext>(undefined as any);

const languages: ILanguage[] = [
  { localeId: "es-AR", name: "Español (argentino)" },
  { localeId: "en-US", name: "English (USA)" },
];

const getInitialLanguage = () =>
  languages.find(l => window?.localStorage?.getItem("language") === l.localeId)?.localeId ||
  languages.find(l => l.localeId.startsWith((window?.navigator?.language ?? "").slice(0, 2)))
    ?.localeId ||
  "en-US";

export const TranslationProvider: React.FC = ({ children }) => {
  const { t, i18n } = useTranslationNext();

  const c = (num: number, currencyCode = "USD") =>
    (num / 1.0).toLocaleString(i18n.language, {
      minimumFractionDigits: 2,
      currency: currencyCode,
      currencyDisplay: "symbol",
      style: "currency",
    });

  React.useEffect(() => {
    i18n.changeLanguage(getInitialLanguage());
  }, []);

  React.useEffect(() => {
    window?.localStorage?.setItem("language", i18n.language);
  }, [i18n.language]);

  const n = (num: number) => num.toLocaleString(i18n.language);

  return (
    <TranslationContext.Provider value={{ t, i18n, c, n, languages }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  return useContext(TranslationContext);
};
