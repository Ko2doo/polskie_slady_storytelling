import { gsap } from '@/core/services/gsap';

import type { TransitionContext } from '@/core/types/story';

export function cardsTransition({ from, to }: TransitionContext): Promise<void> {
  return new Promise((resolve) => {
    const tl = gsap.timeline({
      onComplete: resolve,
    });

    gsap.set(to.el, {
      zIndex: 2,
      yPercent: 82,
      scale: 0.98,
    });

    gsap.set(from.el, {
      zIndex: 1,
    });

    tl.to(
      to.el,
      {
        yPercent: 0,
        scale: 1,
        duration: 1,
      },
      0,
    ).to(
      from.el,
      {
        scale: 0.95,
        opacity: 0.4,
        duration: 1,
      },
      0,
    );

    to.timeline.restart();
  });
}
