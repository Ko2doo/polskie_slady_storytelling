<script lang="ts">
  import { getContext } from "svelte";
  import { fly } from "svelte/transition";

  import type { SlideController } from "@/core/controller/SlideController";

  import Button from "$libs/components/Button.svelte";
  import PrevIcon from "$assets/icons/ui/ArrowUp.svg?raw";
  import NextIcon from "$assets/icons/ui/ArrowDown.svg?raw";

  const controller = getContext<SlideController>("sceneController");
</script>

<nav class="nav-controller">
  {#if controller.current > 0}
    <div in:fly={{ duration: 120, y: -40 }} out:fly={{ duration: 120, y: -20 }}>
      <Button buttonName="scene-controller" onclick={() => controller.prev()}>
        {#snippet icon()}{@html PrevIcon}{/snippet}
      </Button>
    </div>
  {/if}

  <Button buttonName="scene-controller" onclick={() => controller.next()}>
    {#snippet icon()}{@html NextIcon}{/snippet}
  </Button>
</nav>

<style lang="scss">
  @use "$styles/_helpers.scss" as *;
  @use "$styles/_mixins.scss" as *;

  .nav-controller {
    @include flex-column;

    & {
      position: fixed;
      bottom: 10%;

      width: fit-content;
      height: auto;

      row-gap: var(--size-s);

      @include z-index-xl;

      @media (min-width: rem(830)) {
        bottom: 13%;
      }
    }
  }
</style>
