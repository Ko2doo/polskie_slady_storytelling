import { cardsTransition } from './cards';
import { fadeTransition } from './fade';
import { verticalTransition } from './vertical';

export const transitions = {
  cards: cardsTransition,
  fade: fadeTransition,
  vertical: verticalTransition,
};

export type TransitionName = keyof typeof transitions;
