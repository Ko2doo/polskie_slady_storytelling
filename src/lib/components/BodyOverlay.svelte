<script lang="ts">
  import { useUI } from "@/services/UIController.svelte";
  import { POPUP_GROUP } from "@/services/UIController.svelte";

  const ui = useUI();

  function popupAttr(node: HTMLElement) {
    $effect(() => {
      if (ui.activeInGroup(POPUP_GROUP) !== null) {
        node.setAttribute("data-popup-open", "true");
      } else {
        node.removeAttribute("data-popup-open");
      }
    });
  }
</script>

<svelte:body use:popupAttr />

<style lang="scss">
  @use "$styles/_helpers.scss" as *;
  @use "$styles/_mixins.scss" as *;

  :global([data-popup-open="true"]) {
    &::before {
      content: "";

      display: block;
      width: 100%;
      height: 100%;

      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;

      // background: rgba(33, 33, 33, 0.8);
      background: rgba(0 0 0 / 55%);
      backdrop-filter: blur(rem(4));

      @include z-index-s;
    }
  }
</style>
