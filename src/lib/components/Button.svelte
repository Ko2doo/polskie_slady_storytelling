<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";

  type Props = HTMLButtonAttributes & {
    icon?: Snippet;
    label?: string;
    buttonName?: string;
    ref?: HTMLButtonElement;
  };

  let { icon, label, buttonName, ref = $bindable(), ...restProps }: Props = $props();
</script>

<button data-button={buttonName !== undefined ? buttonName : "default"} bind:this={ref} {...restProps}>
  {#if icon}{@render icon()}{/if}

  {#if label}
    <span class="label">{label}</span>
  {/if}
</button>

<style lang="scss">
  [data-button="default"] {
    --btn-label-size: var(--f-size-m);

    --btn-padding-y: var(--size-xs);
    --btn-padding-x: var(--size-xs);

    --btn-bg-color: transparent;
    --btn-label-color: var(--text-color);
    --btn-bg-hover-color: var(--secondary-bg);

    font-family: var(--f-family-secondary);
    font-size: var(--btn-label-size);
    font-weight: 400;
    line-height: 1.2;

    text-transform: capitalize;
    text-align: left;

    padding: var(--btn-padding-y) var(--btn-padding-x);

    border-radius: var(--btn-b-radius);
    background-color: var(--btn-bg-color);
    color: var(--btn-label-color);

    &:has(> .label) .label {
      margin-left: var(--size-s);
    }
  }
</style>
