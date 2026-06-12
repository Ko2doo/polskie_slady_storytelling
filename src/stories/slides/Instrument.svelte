<script lang="ts">
  import { i18n } from "@/services/i18n";

  import Card from "$components/Card.svelte";

  import USAFlag from "$assets/icons/flags/flag-us-svgrepo-com.svg?raw";
  import PLFlag from "$assets/icons/flags/flag-pl-svgrepo-com.svg?raw";
  import RUFlag from "$assets/icons/flags/flag-ru-svgrepo-com.svg?raw";
  import UZBFlag from "$assets/icons/flags/flag-uz-svgrepo-com.svg?raw";
</script>

<section class="instruments">
  <div class="heading">
    <h1 class="heading__title">{$i18n.t("text.instrument.title")}</h1>
    <p class="heading__slogan">{$i18n.t("text.instrument.slogan")}</p>
  </div>

  <div class="content">
    <Card class="card">
      <header class="card-header">
        {@html USAFlag}
      </header>

      <p class="card-description">
        {$i18n.t("text.instrument.en")}
      </p>
    </Card>

    <Card class="card">
      <header class="card-header">
        {@html PLFlag}
      </header>

      <p class="card-description">
        {$i18n.t("text.instrument.pl")}
      </p>
    </Card>

    <Card class="card">
      <header class="card-header">
        {@html RUFlag}
      </header>

      <p class="card-description">
        {$i18n.t("text.instrument.ru")}
      </p>
    </Card>

    <Card class="card">
      <header class="card-header">
        {@html UZBFlag}
      </header>

      <p class="card-description">
        {$i18n.t("text.instrument.oz")}
      </p>
    </Card>
  </div>
</section>

<style lang="scss">
  @use "$styles/_mixins.scss" as *;
  @use "$styles/_helpers.scss" as *;

  .instruments {
    @include size(12);
    @include flex-row;

    & {
      align-content: space-around;

      height: 100%;
      padding: var(--size-xl) var(--size-xl);
    }
  }

  .heading {
    @include size(12);

    & {
      text-align: center;

      margin-inline: auto;
      position: relative;
      z-index: 4;

      @media (min-width: rem(960)) {
        @include size(8);
      }
    }
  }

  .content {
    @include flex-row;

    & {
      width: 100%;
    }
  }

  :global(.card) {
    @include col;
    @include col-size(12);

    & {
      align-items: center;
      text-align: center;

      margin-left: auto;
      margin-right: auto;
      margin-bottom: var(--grid-system-offset-oneside);
    }

    @media (min-width: rem(960)) {
      @include col-size(6);

      & {
        margin-right: 0;
      }

      margin-left: auto;
      margin-right: auto;
    }

    @media (min-width: rem(1200)) {
      @include col-size(3);

      & {
        margin-bottom: 0;
      }
    }
  }

  .card-description {
    font-size: var(--f-size-m);
    font-weight: 400;
    line-height: 1.2;

    text-transform: uppercase;

    display: block;
    color: var(--text-color);
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
