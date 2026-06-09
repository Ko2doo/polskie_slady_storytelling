import type { i18n as I18n } from 'i18next';
import type { Writable } from 'svelte/store';

import i18next from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';

import { createI18nStore } from './i18nextSvelte';
import { resources } from '@/locales';

const devState = import.meta.env.DEV;

export let i18n!: Writable<I18n>;
export let isLoading!: Writable<boolean>;
export let isError!: Writable<boolean>;

export async function initI18n() {
  await i18next.use(I18nextBrowserLanguageDetector).init({
    debug: devState,

    detection: {
      order: ['querystring', 'localStorage', 'navigation'],
      caches: ['localStorage'],
      lookupQuerystring: 'lng',
      lookupLocalStorage: 'locale',
    },

    fallbackLng: 'ru',

    resources,

    interpolation: {
      escapeValue: false,
    },
  });

  const store = createI18nStore(i18next);

  i18n = store.i18n;
  isLoading = store.isLoading;
  isError = store.isError;
}
