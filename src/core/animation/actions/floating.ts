import { gsap } from '@/core/services/gsap';

export function floatAnimation(node: HTMLElement) {
  const tl = gsap.timeline({
    repeat: -1,
    yoyo: true,
    defaults: {
      ease: 'sine.inOut',
      duration: gsap.utils.random(2.5, 3),
    },
  });

  tl.to(node, {
    y: gsap.utils.random(-10, -15),
    rotation: gsap.utils.random(-1, 1.1),
  }).to(
    node,
    {
      x: gsap.utils.random(-8, 8),
    },
    0,
  );

  return {
    destroy() {
      tl.kill();
    },
  };
}
