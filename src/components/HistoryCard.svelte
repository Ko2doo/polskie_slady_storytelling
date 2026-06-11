<script lang="ts">
  import type { Snippet } from "svelte";
  import type { SvelteHTMLElements } from "svelte/elements";

  type Props = SvelteHTMLElements["article"] & {
    children: Snippet;
  };

  let { title, children, ...restProps }: Props = $props();
</script>

<article data-article-card="" {...restProps}>
  {@render children?.()}
</article>

<style lang="scss">
  @use "$styles/_helpers.scss" as *;

  [data-article-card] {
    padding: var(--size-m) var(--size-l);

    border-radius: var(--b-radius-xl);
    border: rem(4) solid var(--gray-bg);
    background-color: var(--secondary-bg);
  }
</style>
