import { mount } from 'svelte';

import { initI18n } from '@/services/i18n';
import '@/core/services/gsap';

import '$styles/_index.scss';
import App from './App.svelte';

async function bootstrap() {
  await Promise.all([initI18n()]);

  const app = mount(App, {
    target: document.getElementById('app')!,
  });

  return app;
}

bootstrap();
