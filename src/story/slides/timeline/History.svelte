<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { buildTimeline } from "@/core/animation/BuildTimeline";

  import type { SlideController } from "@/core/controller/SlideController";

  import { gsap } from "@/core/services/gsap";
  import { showSlide, hideSlide } from "@/core/transitions/visibility";
  import { i18n } from "@/services/i18n";

  import { floatAnimation } from "@/core/animation/actions/floating";

  import HistoryCard from "@/components/HistoryCard.svelte";
  import AnimatedArrowFirst from "@/core/animation/components/AnimatedArrowFirst.svelte";
  import AnimatedArrowSecond from "@/core/animation/components/AnimatedArrowSecond.svelte";

  type Props = {
    index: number;
  };

  let { index }: Props = $props();

  const controller = getContext<SlideController>("sceneController");
  let el: HTMLElement;
  let timeline = $state<GSAPTimeline | undefined>();
  let arrowsTimeline = $state<GSAPTimeline | undefined>();

  onMount(() => {
    timeline = buildTimeline(el);

    const isInitial = index === controller?.current;
    const api = { el, timeline };

    isInitial ? showSlide(api) : hideSlide(api);

    controller?.register(index, api);

    if (isInitial) timeline.restart();

    const mm = gsap.matchMedia();

    // Desktop
    mm.add("(min-width: 1400px)", () => {
      arrowsTimeline = gsap.timeline({ paused: true });

      arrowsTimeline
        .from("#arrow-body-1", {
          drawSVG: "0%",
          duration: 1.5,
          ease: "power1.inOut",
        })
        .from(
          "#arrow-tip-1",
          {
            drawSVG: "0%",
            duration: 0.8,
            ease: "power1.out",
          },
          "-=0.2",
        )
        // started before first animation
        .from("#arrow-body-2", {
          drawSVG: "0%",
          duration: 1.8,
          ease: "power1.inOut",
        })
        .from("#arrow-tip-2", { drawSVG: "0%", duration: 0.4, ease: "power1.out" }, "-=0.2");

      if (controller?.current === index) {
        arrowsTimeline.restart();
      }

      return () => (arrowsTimeline = undefined);
    });

    // Mobile devices
    mm.add("(max-width: 1400px)", () => {
      return () => {};
    });

    // Global cleaner with unmount component
    return () => mm.revert();
  });

  // Reaction for active slide
  $effect(() => {
    if (controller?.current === index) arrowsTimeline?.restart();
    else arrowsTimeline?.pause(0);
  });
</script>

<section class="history" bind:this={el}>
  <div class="wrapper">
    <HistoryCard class="history-card" data-card-id={0} floatAction={floatAnimation}>
      <p class="history-card__title">{$i18n.t("text.history.ks")}</p>

      <AnimatedArrowFirst
        strokeColor="var(--text-color)"
        bodyId="arrow-body-1"
        tipId="arrow-tip-1"
        width={470}
        height={498}
        class="arrow-0"
      />
    </HistoryCard>

    <HistoryCard class="history-card" data-card-id={1} floatAction={floatAnimation}>
      <p class="history-card__title">{$i18n.t("text.history.tml")}</p>

      <AnimatedArrowSecond
        strokeColor="var(--text-color)"
        bodyId="arrow-body-2"
        tipId="arrow-tip-2"
        width={470}
        height={498}
        class="arrow-01"
      />
    </HistoryCard>

    <HistoryCard class="history-card" data-card-id={2} floatAction={floatAnimation}>
      <p class="history-card__title">{$i18n.t("text.history.map")}</p>
    </HistoryCard>
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
      justify-content: center;

      padding-top: var(--size-xxl);
      padding-left: var(--size-m);
      padding-right: var(--size-m);
    }

    @media (min-width: rem(1200)) {
      padding-left: var(--size-xxl);
      padding-right: var(--size-xxl);
    }
  }

  .history {
    @include scene-rule;
    @include scene-advanced;
  }

  :global(.history-card) {
    display: block;

    width: fit-content;
    height: fit-content;

    position: relative;
  }

  :global(.history-card__title) {
    @include heading(center, --f-size-l, --text-color);

    & {
      text-shadow: var(--general-shadow-rule);
    }
  }

  :global([data-card-id]) {
    display: flex;
    align-items: center;

    z-index: 6;

    &:not(:last-child) {
      margin-bottom: rem(120);
    }

    @media (max-width: rem(768)) {
      align-self: center;
      margin: 0 0 var(--size-l) 0;
    }
  }

  :global([data-card-id="0"]) {
    align-self: flex-start;
  }

  :global([data-card-id="1"]) {
    align-self: flex-end;
    margin-right: clamp(rem(20), 8vw, rem(120));
    margin-top: clamp(rem(10), 2vw, rem(30));
  }

  :global([data-card-id="2"]) {
    align-self: flex-start;
    margin-top: clamp(rem(20), 5vw, rem(70));
    margin-left: clamp(rem(20), 6vw, rem(95));
  }

  // Animated arrows
  :global(.arrow-0) {
    position: absolute;
    top: -195%;
    left: 115%;

    z-index: -2;

    transform: rotateZ(340deg);

    @media (max-width: rem(1400)) {
      display: none;
    }
  }

  :global(.arrow-01) {
    position: absolute;
    top: -36%;
    right: 80%;

    z-index: -2;

    transform: rotateZ(118deg);

    @media (max-width: rem(1400)) {
      display: none;
    }
  }
</style>
