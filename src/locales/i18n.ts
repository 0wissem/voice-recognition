import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import en, { type TranslationsType } from "./languages/en";

import fr from "./languages/fr";
import { systemLanguage } from "@utils/helpers/language.helpers";

const i18nInstance = i18n.createInstance();
i18nInstance
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    resources: {
      en: {
        translation: en,
      },
      fr: {
        translation: fr,
      },
    },
    lng: systemLanguage,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  })
  .catch((err: unknown) => {
    // eslint-disable-next-line no-console
    console.log("I18n error", err);
  });

export function translate(name: TxKeyPath, params = {}): string {
  return i18nInstance.t(name, params);
}

export default i18nInstance;

/**
 * Builds up valid keypaths for translations.
 */
export type TxKeyPath = RecursiveKeyOf<TranslationsType>;

type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `${TKey}`
  >;
}[keyof TObj & (string | number)];

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `['${TKey}']` | `.${TKey}`
  >;
}[keyof TObj & (string | number)];

type RecursiveKeyOfHandleValue<
  TValue,
  Text extends string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = TValue extends any[]
  ? Text
  : TValue extends object
  ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
  : Text;
