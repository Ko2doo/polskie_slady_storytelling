import type { PresetName } from './presets';

export type AnimationConfig = {
  preset: PresetName;
  vars?: Record<string, unknown>;
  at?: string | number;
};

export function animate(node: HTMLElement, config: AnimationConfig) {
  (
    node as HTMLElement & {
      __gsap?: AnimationConfig;
    }
  ).__gsap = config;

  return {
    update(next: AnimationConfig) {
      (
        node as HTMLElement & {
          __gsap?: AnimationConfig;
        }
      ).__gsap = next;
    },

    destroy() {
      delete (
        node as HTMLElement & {
          __gsap?: AnimationConfig;
        }
      ).__gsap;
    },
  };
}
