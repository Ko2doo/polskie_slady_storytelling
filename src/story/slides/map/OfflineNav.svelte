<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { animate } from "@/core/animation/animate.svelte";
  import { buildTimeline } from "@/core/animation/buildTimeline";

  import { showSlide, hideSlide } from "@/core/transitions/visibility";
  import type { SlideController } from "@/core/controller/slideController.svelte";

  import AnimatedRoad from "@/core/animation/components/AnimatedRoad.svelte";
  import { i18n } from "@/services/i18n";

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
    const api = {
      el,
      timeline,
    };

    isInitial ? showSlide(api) : hideSlide(api);

    controller?.register(index, api);

    if (isInitial) {
      timeline.restart();
    }
  });
</script>

<section class="offline-nav" bind:this={el}>
  <div class="wrapper">
    <AnimatedRoad {index} />

    <div class="heading">
      <h1 class="heading__title" use:animate={{ preset: "fadeUpSmall" }}>
        {$i18n.t("text.offlineNav.title")}
      </h1>
      <p class="heading__slogan" use:animate={{ preset: "fadeUpSmall" }}>
        {$i18n.t("text.offlineNav.slogan")}
      </p>
    </div>
  </div>
</section>

<style lang="scss">
  @use "$styles/_mixins.scss" as *;
  @use "$styles/_helpers.scss" as *;

  .wrapper {
    @include size(12);
    @include flex-column;
  }

  .offline-nav {
    @include scene-rule;

    & {
      isolation: isolate;
      margin: var(--size-l) 0;
      overflow: hidden;
      // position: relative;
      // z-index: 1;

      &::before {
        content: "";

        display: inline-block;

        position: absolute;
        // left: rem(-10);
        // right: rem(-10);
        // top: rem(-10);
        // bottom: rem(-10);
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;

        background-image: linear-gradient(rgba(43, 43, 43, 0.7), rgba(43, 43, 43, 0.7)),
          url("$assets/images/bg-screenshotv2.webp");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: top;

        border-radius: var(--b-radius-s);
        opacity: 0.9;
      }
    }
  }

  .heading {
    @include size(12);

    & {
      text-align: center;

      margin-top: rem(92);
      margin-inline: auto;
      position: relative;
      z-index: 4;

      @media (min-width: rem(960)) {
        @include size(8);
      }
    }
  }

  .heading__title {
    @include heading(center, --f-size-xxl, --text-color);

    & {
      text-shadow: var(--general-shadow-rule);
    }
  }

  .heading__slogan {
    @include slogan(center, --f-size-l, --text-color);

    & {
      margin-top: var(--size-s);
      text-shadow: var(--general-shadow-rule);
    }
  }
</style>
