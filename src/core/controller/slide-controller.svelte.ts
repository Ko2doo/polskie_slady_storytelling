import { gsap } from '@/services/gsap';
import { storyboard } from '@/story/storyboard';
import { transitions, type TransitionName } from '@/core/transitions/registry';

import type { SlideAPI, TransitionContext } from '@/core/types/story';

export function createController() {
  let current = $state(0);
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
  }

  return {
    register,
    go,

    next() {
      void go(current + 1);
    },

    prev() {
      void go(current - 1);
    },

    get current() {
      return current;
    },

    get transitioning() {
      return transitioning;
    },
  };
}

export type SlideController = ReturnType<typeof createController>;
