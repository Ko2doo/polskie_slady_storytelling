<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";

  type Props = HTMLButtonAttributes & {
    icon?: Snippet;
    label: string;
  };

  let { icon, label, ...restProps }: Props = $props();
</script>

<button class="menu-button" {...restProps}>
  {#if icon}{@render icon()}{/if}

  <span class="label">{label}</span>
</button>

<style lang="scss">
  @use "$styles/_mixins.scss" as *;

  .menu-button {
    @include menu-item;
  }
</style>
