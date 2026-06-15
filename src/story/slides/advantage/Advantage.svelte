<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { animate } from "@/core/animation/animate.svelte";
  import { buildTimeline } from "@/core/animation/buildTimeline";

  import { showSlide, hideSlide } from "@/core/transitions/visibility";
  import type { SlideController } from "@/core/controller/slideController.svelte";

  import { i18n } from "@/services/i18n";

  import Card from "$components/Card.svelte";

  import USAFlag from "$assets/icons/flags/flag-us-svgrepo-com.svg?raw";
  import PLFlag from "$assets/icons/flags/flag-pl-svgrepo-com.svg?raw";
  import RUFlag from "$assets/icons/flags/flag-ru-svgrepo-com.svg?raw";
  import UZBFlag from "$assets/icons/flags/flag-uz-svgrepo-com.svg?raw";

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

<section class="advantage" bind:this={el}>
  <div class="wrapper">
    <div class="heading">
      <h1 class="heading__title" use:animate={{ preset: "fadeUpSmall" }}>
        {$i18n.t("text.instrument.title")}
      </h1>
      <p class="heading__slogan" use:animate={{ preset: "fadeUpSmall" }}>
        {$i18n.t("text.instrument.slogan")}
      </p>
    </div>

    <div class="content">
      <Card class="card">
        <header class="card-header">
          {@html USAFlag}
        </header>

        <p class="card-description">
          {$i18n.t("text.instrument.en")}
        </p>
      </Card>

      <Card class="card">
        <header class="card-header">
          {@html PLFlag}
        </header>

        <p class="card-description">
          {$i18n.t("text.instrument.pl")}
        </p>
      </Card>

      <Card class="card">
        <header class="card-header">
          {@html RUFlag}
        </header>

        <p class="card-description">
          {$i18n.t("text.instrument.ru")}
        </p>
      </Card>

      <Card class="card">
        <header class="card-header">
          {@html UZBFlag}
        </header>

        <p class="card-description">
          {$i18n.t("text.instrument.oz")}
        </p>
      </Card>
    </div>
  </div>
</section>

<style lang="scss">
  @use "$styles/_mixins.scss" as *;
  @use "$styles/_helpers.scss" as *;

  .wrapper {
    @include size(12);
    @include flex-row;

    & {
      align-content: space-around;

      padding: var(--size-xl) var(--size-xl);
    }
  }

  .advantage {
    @include scene-rule;
    @include scene-advanced;
  }

  .heading {
    @include size(12);

    & {
      text-align: center;

      margin-inline: auto;
      position: relative;
      z-index: 4;

      @media (min-width: rem(960)) {
        @include size(8);
      }
    }
  }

  .content {
    @include flex-row;

    & {
      width: 100%;

      justify-content: center;

      gap: var(--size-s);
    }

    @media (max-width: rem(1060)) {
      margin-top: var(--size-s);
    }
  }

  :global(.advantage .card) {
    @include card-size-rule;
  }

  .card-description {
    font-size: var(--f-size-m);
    font-weight: 400;
    line-height: 1.2;

    text-transform: uppercase;

    display: block;
    color: var(--text-color);
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
