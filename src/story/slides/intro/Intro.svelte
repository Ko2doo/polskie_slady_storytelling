<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { animate } from "@/core/animation/animate.svelte";
  import { buildTimeline } from "@/core/animation/buildTimeline";

  import type { SlideController } from "@/core/controller/slideController.svelte";
  import { showSlide, hideSlide } from "@/core/transitions/visibility";

  import { i18n } from "@/services/i18n";

  import AppIcon from "$assets/icons/app-icon.webp";

  type Props = {
    index: number;
  };

  let { index }: Props = $props();

  const controller = getContext<SlideController>("sceneController");
  let el: HTMLElement;
  let timeline = $state<GSAPTimeline | undefined>();

  onMount(() => {
    timeline = buildTimeline(el);

    const isInitial = index === controller?.current;
    const api = { el, timeline };

    isInitial ? showSlide(api) : hideSlide(api);

    controller?.register(index, api);

    if (isInitial) timeline.restart();
  });
</script>

<section class="hero" bind:this={el}>
  <div class="wrapper">
    <img use:animate={{ preset: "fadeUp" }} src={AppIcon} alt="Polskie Ślady Taszkent - app" class="app-icon" />

    <div class="hero__heading">
      <h1 class="app-name" use:animate={{ preset: "fadeUpSmall" }}>Polskie Ślady Taszkent</h1>
      <h3 class="app-slogan" use:animate={{ preset: "fadeUpSmall" }}>{$i18n.t("text.hero.appSlogan")}</h3>
    </div>
  </div>
</section>

<style lang="scss">
  @use "$styles/_mixins.scss" as *;
  @use "$styles/_helpers.scss" as *;

  .wrapper {
    @include size(12);
    @include flex-column;

    & {
      align-items: center;
      margin-inline: auto;
    }

    @media (min-width: rem(1200)) {
      @include size(6);

      & {
        padding-left: 0;
        padding-right: 0;
      }
    }
  }

  .hero {
    @include scene-rule;
    @include scene-advanced;

    & {
      padding-top: var(--size-xxl);

      padding-left: var(--size-m);
      padding-right: var(--size-m);
    }

    &__heading {
      text-align: center;
      margin-top: var(--size-xl);
    }
  }

  .app-icon {
    width: clamp(rem(320), 6vw, rem(120));
    height: clamp(rem(320), 6vw, rem(120));

    object-fit: contain;
    object-position: center;
  }

  .app-name {
    @include heading(center, --f-size-3l, --text-color);

    & {
      text-shadow: var(--general-shadow-rule);
    }
  }

  .app-slogan {
    @include slogan(center, --f-size-xl, --text-color);

    & {
      margin-top: var(--size-s);
      text-shadow: var(--general-shadow-rule);
    }
  }
</style>
