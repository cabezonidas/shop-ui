import { useContext } from "react";
import * as React from "react";
import { useTranslation as useTranslationNext, initReactI18next } from "react-i18next";
import i18next, { TFunction, i18n as i18nObject } from "i18next";

export interface ILanguage {
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

export const defaultLanguages: ILanguage[] = [
  { localeId: "es-AR", name: "Español (argentino)" },
  { localeId: "en-US", name: "English (USA)" },
];

const parseLanguages = (lngs: ILanguage[]) => {
  return lngs.reduce<{ [key: string]: { translation: object } }>((res, language) => {
    res[language.localeId] = { translation: {} };
    return res;
  }, {});
};

export const TranslationProvider: React.FC<{ languages: ILanguage[] }> = ({
  children,
  languages,
}) => {
  const { t, i18n } = useTranslationNext();

  React.useEffect(() => {
    i18next.use(initReactI18next).init({
      resources: parseLanguages(languages),
      lng: languages[0]?.localeId,
      fallbackLng: languages[0]?.localeId,
    });
  }, []);

  const c = (num: number, currencyCode = "USD") =>
    (num / 1.0).toLocaleString(i18n.language, {
      minimumFractionDigits: 2,
      currency: currencyCode,
      currencyDisplay: "symbol",
      style: "currency",
    });

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
