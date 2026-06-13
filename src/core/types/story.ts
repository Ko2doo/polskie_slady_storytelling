export type SlideAPI = {
  el: HTMLElement;
  timeline: GSAPTimeline;
};

export type StoryScene = {
  id: string;
  transition: string;
};

export type TransitionContext = {
  from: SlideAPI;
  to: SlideAPI;
  dir: 1 | -1;
};
