<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";

  type Props = HTMLButtonAttributes & {
    icon?: Snippet;
    label?: string;
    className?: string;
    ref?: HTMLButtonElement;
  };

  let { icon, label, className = "button", ref = $bindable(), ...restProps }: Props = $props();
</script>

<button bind:this={ref} class={className} {...restProps}>
  {#if icon}{@render icon()}{/if}

  {#if label}
    <span class="label">{label}</span>
  {/if}
</button>

<style lang="scss">
  .button {
    --btn-label-size: var(--f-size-m);
    --btn-b-radius: var(--b-radius-s);
    --btn-padding-y: var(--size-xs);
    --btn-padding-x: var(--size-xs);

    font-family: var(--f-family-secondary);
    font-size: var(--btn-label-size);
    font-weight: 400;
    line-height: 1.2;

    text-transform: capitalize;
    text-align: left;

    // width: fit-content;
    // height: fit-content;
    padding: var(--btn-padding-y) var(--btn-padding-x);

    border-radius: var(--btn-b-radius);
    background-color: var(--dark-bg);
    color: var(--text-color);

    &:has(> .label) .label {
      margin-left: var(--size-s);
    }
  }

  .menu-item {
    font-family: var(--f-family-secondary);
    font-size: var(--f-size-m);
    font-weight: 400;
    line-height: 1.2;

    text-transform: capitalize;

    display: flex;
    flex-wrap: nowrap;

    align-items: center;
    justify-content: flex-start;

    padding: var(--size-xs);
    gap: var(--size-s);

    border-radius: var(--b-radius-s);
    background-color: var(--secondary-bg);
    color: var(--text-color);
  }
</style>
