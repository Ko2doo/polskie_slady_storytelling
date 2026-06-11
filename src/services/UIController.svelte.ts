import { getContext, setContext } from 'svelte';

class UIController {
  // registry: key - id, value - opened/closed
  #registry = $state<Record<string, boolean>>({});

  // group -> id current opened element in group (or null)
  #groups = $state<Record<string, string | null>>({});

  // id -> group, from auto-close
  #idToGroup = new Map<string, string>();

  isOpen(id: string): boolean {
    return !!this.#registry[id];
  }

  /**
   * Open element
   * @param group - if specified, all other elements of this group are closed (accordion behavior)
   */
  open(id: string, group?: string) {
    if (group) {
      const current = this.#groups[group];

      if (current && current !== id) {
        this.#registry[current] = false;
      }

      this.#groups[group] = id;
      this.#idToGroup.set(id, group);
    }

    this.#registry[id] = true;
  }

  close(id: string) {
    this.#registry[id] = false;

    const group = this.#idToGroup.get(id);
    if (group && this.#groups[group] === id) {
      this.#groups[group] = null;
    }
  }

  toggle(id: string, group?: string) {
    this.isOpen(id) ? this.close(id) : this.open(id, group);
  }

  closeAll() {
    for (const key in this.#registry) this.#registry[key] = false;
    for (const key in this.#groups) this.#groups[key] = null;
  }

  closeAllExcept(exceptId: string) {
    for (const key in this.#registry) {
      if (key !== exceptId) this.close(key);
    }
  }

  // Submenu
  activeInGroup(group: string): string | null {
    return this.#groups[group] ?? null;
  }
}

export const POPUP_GROUP = 'popups';

const UI_CONTEXT_KEY = Symbol('UI_CONTEXT');

// Create service and registration from component
export function createUIContext() {
  const controller = new UIController();

  setContext(UI_CONTEXT_KEY, controller);
  return controller;
}

export function useUI() {
  const context = getContext<UIController>(UI_CONTEXT_KEY);

  if (!context) {
    throw new Error('useUI only use in component, where createUIContext is called.');
  }

  return context;
}
