import { gsap } from '@/core/services/gsap';
import type { TransitionContext } from '@/core/types/story';

export function fadeTransition({ from, to }: TransitionContext): Promise<void> {
  return new Promise((resolve) => {
    const tl = gsap.timeline({
      onComplete: resolve,
    });

    gsap.set(to.el, {
      opacity: 0,
      zIndex: 2,
    });

    tl.to(
      from.el,
      {
        opacity: 0,
        duration: 0.5,
      },
      0,
    ).to(
      to.el,
      {
        opacity: 1,
        duration: 0.7,
      },
      0.15,
    );

    to.timeline.restart();
  });
}
