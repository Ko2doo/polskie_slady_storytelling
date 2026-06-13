import { getLocalStorage, setLocalStorage } from '@/utils/localeStorageUtils';

const STORAGE_KEY = 'app-state';

type PersistedState = {
  locked: boolean;
  currentSlide: number;
};

const DEFAULT_STATE: PersistedState = {
  locked: true,
  currentSlide: 0,
};

function loadState(): PersistedState {
  const stored = getLocalStorage<PersistedState>(STORAGE_KEY);

  return {
    locked: stored?.locked ?? DEFAULT_STATE.locked,
    currentSlide: stored?.currentSlide ?? DEFAULT_STATE.currentSlide,
  };
}

function createAppState() {
  const initial = loadState();

  let locked = $state(initial.locked);
  let currentSlide = $state(initial.currentSlide);

  function persist(): void {
    setLocalStorage<PersistedState>(STORAGE_KEY, { locked, currentSlide });
  }

  return {
    get locked() {
      return locked;
    },

    get currentSlide() {
      return currentSlide;
    },

    setCurrentSlide(index: number) {
      currentSlide = index;
      persist();
    },

    unlock() {
      locked = false;
      persist();
    },

    lock() {
      locked = true;
      currentSlide = 0;
      persist();
    },
  };
}

export const appState = createAppState();
