<script lang="ts">
  import type { Snippet } from "svelte";
  import type { SvelteHTMLElements } from "svelte/elements";

  import { gsap } from "@/services/gsap";
  import { untrack } from "svelte";
  import { useUI } from "@/services/UIController.svelte";

  // Positioning
  type Placement = "top" | "bottom";

  type Props = SvelteHTMLElements["article"] & {
    id: string;
    onDocumentClick?: boolean;
    duration?: number;

    anchor?: HTMLElement | null;
    placement?: Placement;
    offset?: number;

    children?: Snippet;
  };

  let {
    id,
    onDocumentClick = true,
    duration = 0.18,

    anchor = null,
    placement = "bottom",
    offset = 8,

    children,
    ...restProps
  }: Props = $props();

  const ui = useUI();

  let visible = $state(untrack(() => ui.isOpen(id)));
  let articleEl: HTMLElement | undefined = $state();

  let resolvedPlacement = $state<Placement>(untrack(() => placement));

  function resolvePlacement() {
    if (!anchor || !articleEl) return;

    const anchorRect = anchor.getBoundingClientRect();
    const popupRect = articleEl.getBoundingClientRect();

    if (placement === "bottom") {
      const fitsBelow = anchorRect.bottom + offset + popupRect.height <= window.innerHeight;
      resolvedPlacement = fitsBelow ? "bottom" : "top";
    } else {
      const fitsAbove = anchorRect.top - offset - popupRect.height >= 0;
      resolvedPlacement = fitsAbove ? "top" : "bottom";
    }
  }

  function applyPosition(animate = false) {
    if (!anchor || !articleEl) return;

    const anchorRect = anchor.getBoundingClientRect();
    const popupRect = articleEl.getBoundingClientRect();

    let left = anchorRect.left;

    if (left + popupRect.width > window.innerWidth) {
      left = window.innerWidth - popupRect.width - offset;
    }
    if (left < 0) left = offset;

    const props: Record<string, string> = { left: `${left}px` };

    if (resolvedPlacement === "bottom") {
      props.top = `${anchorRect.bottom + offset}px`;
      props.bottom = "auto";
    } else {
      props.bottom = `${window.innerHeight - anchorRect.top + offset}px`;
      props.top = "auto";
    }

    if (animate) {
      gsap.to(articleEl, {
        ...props,
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    } else {
      Object.assign(articleEl.style, props);
    }
  }

  function updatePosition(animate = false, recalcPlacement = false) {
    if (recalcPlacement) resolvePlacement();
    applyPosition(animate);
  }

  // Open Close popup
  $effect(() => {
    if (ui.isOpen(id) && !visible) visible = true;
    else if (!ui.isOpen(id) && visible && articleEl) {
      gsap.to(articleEl, {
        opacity: 0,
        scale: 0.96,
        duration,
        ease: "power2.in",
        onComplete: () => {
          visible = false;
        },
      });
    }
  });

  $effect(() => {
    if (ui.isOpen(id) && visible && articleEl) {
      updatePosition(false, true);

      // prettier-ignore
      gsap.fromTo(articleEl, 
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration, ease: "power2.out" }
      );
    }
  });

  // recalculation of position when resizing/scrolling the window
  $effect(() => {
    if (!ui.isOpen(id) || !anchor) return;

    const handler = () => updatePosition(false, true);

    window.addEventListener("resize", handler);
    window.addEventListener("scroll", handler, true);

    return () => {
      window.removeEventListener("resize", handler);
      window.removeEventListener("scroll", handler, true);
    };
  });

  // recalculation of the position when changing the INTERNAL size of the pop-up (opening a submenu, etc.)
  $effect(() => {
    if (!ui.isOpen(id) || !anchor || !articleEl) return;

    const observer = new ResizeObserver(() => {
      updatePosition(true, false);
    });

    observer.observe(articleEl);

    return () => {
      observer.disconnect();
    };
  });

  $effect(() => {
    if (!onDocumentClick || !ui.isOpen(id)) return;

    const handler = (e: MouseEvent) => {
      if (articleEl && !articleEl.contains(e.target as Node)) {
        ui.close(id);
      }
    };

    let rafId: number;
    rafId = requestAnimationFrame(() => {
      document.addEventListener("click", handler);
    });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handler);
    };
  });
</script>

{#if visible}
  <article bind:this={articleEl} class="popup" class:popup--anchored={!!anchor} {...restProps}>
    {@render children?.()}
  </article>
{/if}

<style lang="scss">
  @use "$styles/_mixins.scss" as *;
  @use "$styles/_helpers.scss" as *;

  .popup {
    @include popup;

    &--anchored {
      position: fixed;
      top: 0;
      left: 0;

      // max-height: calc(100dvh -#{rem(16)});
      overflow-y: auto;
    }
  }
</style>
