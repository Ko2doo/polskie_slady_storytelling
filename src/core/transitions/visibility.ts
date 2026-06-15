import { gsap } from '@/core/services/gsap';
import type { SlideAPI } from '@/core/types/story';

export function showSlide(slide: SlideAPI): void {
  gsap.set(slide.el, { visibility: 'visible' });
}

export function hideSlide(slide: SlideAPI): void {
  gsap.set(slide.el, { visibility: 'hidden' });
}
