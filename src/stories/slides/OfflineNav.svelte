<script lang="ts">
  import { i18n } from "@/services/i18n";
</script>

<section class="offline-nav">
  <div class="heading">
    <h1 class="heading__title">{$i18n.t("text.offlineNav.title")}</h1>
    <p class="heading__slogan">{$i18n.t("text.offlineNav.slogan")}</p>
  </div>
</section>

<style lang="scss">
  @use "$styles/_mixins.scss" as *;
  @use "$styles/_helpers.scss" as *;

  .offline-nav {
    @include size(12);
    @include flex-column;

    & {
      height: 100%;
      padding: var(--size-xl) var(--size-xl);
    }
  }

  .heading {
    @include size(12);

    & {
      text-align: center;

      margin-top: rem(92);
      margin-inline: auto;
      position: relative;
      z-index: 4;

      @media (min-width: rem(960)) {
        @include size(8);
      }
    }
  }

  .heading__title {
    @include heading(center, --f-size-xxl, --text-color);

    & {
      text-shadow: var(--general-shadow-rule);
    }
  }

  .heading__slogan {
    @include slogan(center, --f-size-l, --text-color);

    & {
      margin-top: var(--size-s);
      text-shadow: var(--general-shadow-rule);
    }
  }
</style>
