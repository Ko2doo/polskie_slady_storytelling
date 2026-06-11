<script lang="ts">
  import { i18n } from "@/services/i18n";
  import HistoryCard from "@/components/HistoryCard.svelte";

  interface HistoryCard {
    title: string;
  }
</script>

<section class="history">
  {#each $i18n.t("text.history", { returnObjects: true }) as HistoryCard[] as item}
    <HistoryCard class="history-card">
      <p class="history-card__title">{item.title}</p>
    </HistoryCard>
  {/each}
</section>

<style lang="scss">
  @use "$styles/_mixins.scss" as *;
  @use "$styles/_helpers.scss" as *;

  .history {
    @include size(12);
    @include flex-row;

    & {
      height: 100%;
      align-content: flex-start;

      padding-top: var(--size-xxl);

      padding-left: var(--size-m);
      padding-right: var(--size-m);
    }

    @media (min-width: rem(1200)) {
      padding-left: 0;
      padding-right: 0;
    }
  }

  :global(.history-card) {
    display: block;

    width: fit-content;
    height: fit-content;
  }

  :global(.history-card__title) {
    @include heading(center, --f-size-xl, --text-color);

    & {
      text-shadow: var(--general-shadow-rule);
    }
  }
</style>
