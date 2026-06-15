import { gsap } from '@/core/services/gsap';
import { presets } from './presets';

import type { AnimationConfig } from './animate.svelte';

type AnimationElement = HTMLElement & {
  __gsap?: AnimationConfig;
};

export function buildTimeline(root: HTMLElement): GSAPTimeline {
  const tl = gsap.timeline({
    paused: true,
  });

  const nodes = root.querySelectorAll('*');

  for (const node of nodes) {
    const anim = (node as AnimationElement).__gsap;

    if (!anim) continue;

    tl.from(
      node,
      {
        ...presets[anim.preset],
        ...anim.vars,
      },
      anim.at,
    );
  }

  return tl;
}
