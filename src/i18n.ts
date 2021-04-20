import { i18n } from '@lingui/core';
import { en } from 'make-plural/plurals'

export const locales = {
  "en-us": "English"
};

export const defaultLocale = "en-us";

i18n.loadLocaleData({
  "en-us": { plurals: en }
})

export async function dynamicActivate(locale: string) {
  const { messages } = await import(/* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */
  `./locales/${locale}/messages.js`);
  i18n.load(locale, messages)
  i18n.activate(locale)
}
