<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { animate } from "@/core/animation/animate.svelte";
  import { buildTimeline } from "@/core/animation/buildTimeline";

  import { showSlide, hideSlide } from "@/core/transitions/visibility";
  import type { SlideController } from "@/core/controller/slideController.svelte";

  import { i18n } from "@/services/i18n";

  import Card from "$components/Card.svelte";

  import AndroidIcon from "$assets/icons/brand-android.svg?raw";
  import AppleIcon from "$assets/icons/brand-apple.svg?raw";
  import FreeIcon from "$assets/icons/creative-commons-nc.svg?raw";
  import NoDataIcon from "$assets/icons/mobiledata-off.svg?raw";
  import LicensyIcon from "$assets/icons/license.svg?raw";

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

<section class="app-info" bind:this={el}>
  <div class="wrapper">
    <div class="heading">
      <h1 class="heading__title" use:animate={{ preset: "fadeUpSmall" }}>polskie Ślady taszkent</h1>
      <p class="heading__slogan" use:animate={{ preset: "fadeUpSmall" }}>{$i18n.t("text.app.slogan")}</p>
    </div>

    <div class="content">
      <Card class="card">
        <header class="card-header">
          {@html AndroidIcon}
          {@html AppleIcon}
        </header>

        <p class="card-description">
          {$i18n.t("text.app.platform")}
        </p>
      </Card>

      <Card class="card">
        <header class="card-header">
          {@html FreeIcon}
        </header>

        <p class="card-description">
          {$i18n.t("text.app.free")}
        </p>
      </Card>

      <Card class="card">
        <header class="card-header">
          {@html NoDataIcon}
        </header>

        <p class="card-description">
          {$i18n.t("text.app.nodata")}
        </p>
      </Card>

      <Card class="card">
        <header class="card-header">
          {@html LicensyIcon}
        </header>

        <p class="card-description">
          {$i18n.t("text.app.licensy")}
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

  .app-info {
    @include scene-rule;
    @include scene-advanced;
  }

  .heading {
    @include size(12);

    & {
      position: relative;
      z-index: 4;
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

  :global(.app-info .card) {
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
