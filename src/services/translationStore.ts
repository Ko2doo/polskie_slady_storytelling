/**
 * This is a i18next translation store class
 *
 * All thanks, about and examples: https://github.com/NishuGoel/svelte-i18next
 *
 * This script uses the original svelte-i18next code, but is rewritten in js insead of ts.
 */
import type { i18n } from 'i18next';
import { writable, type Readable, type Writable } from 'svelte/store';

// The global store loading
// export const isLoading = writable(true);

export interface TranslationService {
  i18n: Readable<i18n>;
}

export class I18NextTranslationStore implements TranslationService {
  public i18n: Writable<i18n>;
  public isLoading: Writable<boolean>;
  public isError: Writable<boolean>;

  // Constructor
  constructor(i18n: i18n) {
    this.i18n = writable(i18n);

    this.isLoading = writable(true);
    this.isError = writable(false);

    this.bindOnChange(i18n);
    this.bindOnLoad(i18n);
  }

  // Methods
  bindOnChange(i18n: i18n) {
    const setupI18n = () => {
      this.i18n.set(i18n);
    };

    i18n.on('initialized', setupI18n);
    i18n.on('loaded', setupI18n);
    i18n.on('added', setupI18n);
    i18n.on('languageChanged', setupI18n);
  }

  bindOnLoad(i18n: i18n) {
    i18n.on('loaded', (resources) => {
      if (resources && Object.keys(resources).length !== 0) this.isLoading.set(false);
    });

    i18n.on('failedLoading', () => {
      this.isError.set(true);
    });
  }
}
