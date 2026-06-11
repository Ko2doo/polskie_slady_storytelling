<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";

  type Props = HTMLButtonAttributes & {
    icon?: Snippet;
    label: string;
  };

  let { icon, label, ...restProps }: Props = $props();
</script>

<button class="submenu-item" {...restProps}>
  {#if icon}{@render icon()}{/if}

  <span class="label">{label}</span>
</button>

<style lang="scss">
  @use "$styles/_mixins.scss" as *;

  .submenu-item {
    @include submenu-item;
  }
</style>
