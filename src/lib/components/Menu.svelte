<script lang="ts">
  import type { Snippet } from "svelte";
  import type { SvelteHTMLElements } from "svelte/elements";
  import { useUI } from "@/services/UIController.svelte";

  import ExpandableSection from "./ExpandableSection.svelte";
  import MenuButton from "./MenuButton.svelte";

  type Props = SvelteHTMLElements["section"] & {
    id: string;
    group?: string;
    icon?: Snippet;
    label: string;
    children?: Snippet;
  };

  let { id, group, icon, label, children }: Props = $props();

  const ui = useUI();
</script>

<section class="menu">
  <MenuButton {label} {icon} onclick={() => children && ui.toggle(id, group)} />

  {#if children}
    <ExpandableSection open={ui.isOpen(id)}>
      {@render children()}
    </ExpandableSection>
  {/if}
</section>

<style lang="scss">
  @use "$styles/_mixins.scss" as *;

  .menu {
    @include popup-inner-menu;
  }
</style>
