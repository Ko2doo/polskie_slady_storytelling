import { storyboard } from '@/story/storyboard';
import { transitions, type TransitionName } from '@/core/transitions/registry';

import type { SlideAPI, TransitionContext } from '@/core/types/story';
import { appState } from '@/core/state/AppState.svelte';

export function slidesController() {
  let current = $state(appState.currentSlide);
  let transitioning = $state(false);

  const slides: SlideAPI[] = [];

  function register(index: number, api: SlideAPI): void {
    slides[index] = api;
  }

  async function go(index: number): Promise<void> {
    if (transitioning) return;
    if (!slides[index]) return;
    if (index === current) return;

    transitioning = true;

    const from = slides[current];
    const to = slides[index];
    const dir: 1 | -1 = index > current ? 1 : -1;

    const requested = storyboard[current]?.transition ?? 'cards';
    const transitionName: TransitionName = requested in transitions ? (requested as TransitionName) : 'cards';
    const transition = transitions[transitionName];

    const ctx: TransitionContext = { from, to, dir };
    await transition(ctx);

    current = index;
    transitioning = false;

    appState.setCurrentSlide(current);
  }

  function jumpTo(index: number): void {
    if (!slides[index]) return;
    current = index;
  }

  return {
    register,
    go,
    jumpTo,

    next() {
      void go(current + 1);
    },

    prev() {
      void go(current - 1);
    },

    isActive(index: number) {
      return current === index;
    },

    get current() {
      return current;
    },

    get transitioning() {
      return transitioning;
    },
  };
}

export type SlideController = ReturnType<typeof slidesController>;
