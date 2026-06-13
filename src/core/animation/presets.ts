export const presets = {
  fadeUp: {
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: 'power3.out',
  },

  fadeUpSmall: {
    opacity: 0,
    y: 20,
    duration: 0.5,
  },

  scaleIn: {
    opacity: 0,
    scale: 0.9,
    duration: 0.7,
  },
};

export type PresetName = keyof typeof presets;
