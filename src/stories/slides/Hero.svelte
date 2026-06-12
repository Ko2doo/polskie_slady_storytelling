<script lang="ts">
  import { i18n } from "@/services/i18n";

  import AppIcon from "$assets/icons/app-icon.webp";
</script>

<section class="hero">
  <img src={AppIcon} alt="Polskie Ślady Taszkent - app" class="app-icon" />

  <div class="hero__heading">
    <h1 class="app-name">Polskie Ślady Taszkent</h1>
    <h3 class="app-slogan">{$i18n.t("text.hero.appSlogan")}</h3>
  </div>
</section>

<style lang="scss">
  @use "$styles/_mixins.scss" as *;
  @use "$styles/_helpers.scss" as *;

  .hero {
    @include size(12);
    @include flex-column;

    & {
      height: 100%;

      align-items: center;
      margin-inline: auto;

      padding-top: var(--size-xxl);

      padding-left: var(--size-m);
      padding-right: var(--size-m);
    }

    @media (min-width: rem(1200)) {
      @include size(6);

      & {
        padding-left: 0;
        padding-right: 0;
      }
    }

    &__heading {
      text-align: center;
      margin-top: var(--size-xl);
    }
  }

  .app-icon {
    width: clamp(rem(320), 6vw, rem(120));
    height: clamp(rem(320), 6vw, rem(120));

    object-fit: contain;
    object-position: center;
  }

  .app-name {
    @include heading(center, --f-size-3l, --text-color);

    & {
      text-shadow: var(--general-shadow-rule);
    }
  }

  .app-slogan {
    @include slogan(center, --f-size-xl, --text-color);

    & {
      margin-top: var(--size-s);
      text-shadow: var(--general-shadow-rule);
    }
  }
</style>
