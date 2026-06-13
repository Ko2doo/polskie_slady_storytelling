<script lang="ts">
  import { untrack, type Snippet } from "svelte";
  import { expandMenu } from "@/core/animation/actions/expandMenu";

  type Props = {
    open: boolean;
    duration?: number;
    easeIn?: string;
    easeOut?: string;
    children?: Snippet;
  };

  let { open, duration = 0.32, easeIn = "power2.out", easeOut = "power2.in", children }: Props = $props();

  let visible = $state(untrack(() => open));
  let containerEl: HTMLElement | undefined = $state();

  // Open
  $effect(() => {
    if (open && !visible) visible = true;
  });

  // Close
  $effect(() => {
    if (!open && visible && containerEl) {
      const { out } = expandMenu(containerEl, { duration, easeOut });
      out().then(() => (visible = false));
    }
  });

  // Animation
  $effect(() => {
    if (open && visible && containerEl) {
      const { in: animIn } = expandMenu(containerEl, { duration, easeIn });
      animIn();
    }
  });
</script>

{#if visible}
  <div bind:this={containerEl} class="expandable">
    {@render children?.()}
  </div>
{/if}

<style lang="scss">
  @use "$styles/_mixins.scss" as *;

  .expandable {
    @include expandable-submenu;
  }
</style>
