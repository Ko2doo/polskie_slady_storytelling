import { gsap } from '@/core/services/gsap';
import type { TransitionContext } from '@/core/types/story';
import { showSlide, hideSlide } from './visibility';

export function verticalTransition({ from, to, dir }: TransitionContext): Promise<void> {
  return new Promise((resolve) => {
    showSlide(to);

    const tl = gsap.timeline({
      onComplete: () => {
        hideSlide(from);
        to.onEnter?.();
        resolve();
      },
    });

    tl.to(
      from.el,
      {
        // yPercent: -180 * dir,
        y: `${-100 * dir}dvh`,
        duration: 0.9,
        ease: 'power2.inOut',
      },
      0,
    ).fromTo(
      to.el,
      {
        // yPercent: 100 * dir,
        y: `${100 * dir}dvh`,
      },
      {
        // yPercent: 0,
        y: '0dvh',
        duration: 0.9,
        ease: 'power2.inOut',
      },
      0,
    );

    to.timeline.restart();
  });
}
