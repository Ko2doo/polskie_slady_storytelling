import { gsap } from '@/core/services/gsap';

interface ExpandOptions {
  duration?: number;
  easeIn?: string;
  easeOut?: string;
}

export function expandMenu(node: HTMLElement, options: ExpandOptions = {}) {
  const { duration = 0.25, easeIn = 'power2.out', easeOut = 'power2.in' } = options;

  return {
    in() {
      const height = node.scrollHeight;

      return new Promise<void>((resolve) => {
        gsap.fromTo(
          node,
          { height: 0, opacity: 0, overflow: 'hidden' },
          {
            height,
            opacity: 1,
            duration,
            ease: easeIn,
            onComplete: () => {
              node.style.height = 'auto';
              node.style.overflow = '';
              resolve();
            },
          },
        );
      });
    },
    out() {
      const height = node.scrollHeight;

      return new Promise<void>((resolve) => {
        gsap.fromTo(
          node,
          { height, opacity: 1, overflow: 'hidden' },
          {
            height: 0,
            opacity: 0,
            duration,
            ease: easeOut,
            onComplete: resolve,
          },
        );
      });
    },
  };
}
