<script lang="ts">
  import { i18n } from "@/services/i18n";
  import { SvelteDate } from "svelte/reactivity";

  import Button from "$libs/components/Button.svelte";
  import Unlock from "$assets/icons/ui/Unlock.svg?raw";

  type Props = {
    onUnlock: () => void;
  };

  let { onUnlock }: Props = $props();

  let el: HTMLElement;
  let timeline = $state<GSAPTimeline | undefined>();

  function useLiveClock() {
    const date = new SvelteDate();

    $effect(() => {
      const interval = setInterval(() => {
        date.setTime(Date.now());
      }, 1000);

      return () => clearInterval(interval);
    });

    return date;
  }

  let date = useLiveClock();

  const timeFormatter = $derived(
    new Intl.DateTimeFormat($i18n.language, {
      hour: "2-digit",
      minute: "2-digit",
      // second: "2-digit",
    }),
  );

  const dateFormatter = $derived(
    new Intl.DateTimeFormat($i18n.language, {
      weekday: "long",
      day: "numeric",
      month: "long",
    }),
  );
</script>

<section class="lockscreen">
  <div class="wrapper">
    <header class="lockscreen__clock">
      <!-- Clock and date -->
      <h1 class="time">{timeFormatter.format(date)}</h1>
      <p class="date">{dateFormatter.format(date)}</p>
    </header>

    <footer class="lockscreen__footer">
      <div class="lockscreen__unlock">
        <Button
          label={$i18n.t("ui.screenlock.unlock")}
          style="--btn-bg-color: var(--general-bg); --btn-padding-y: var(--size-s); --btn-padding-x: var(--size-m); --btn-label-size: var(--f-size-l);"
          onclick={onUnlock}
        >
          {#snippet icon()}
            {@html Unlock}
          {/snippet}
        </Button>

        <p class="description">{$i18n.t("ui.screenlock.footermsg")}</p>
      </div>
    </footer>
  </div>
</section>

<style lang="scss">
  @use "$styles/_helpers.scss" as *;
  @use "$styles/_mixins.scss" as *;

  .wrapper {
    @include flex-column;

    & {
      padding-top: var(--size-xxl);
      justify-content: space-between;
    }
  }

  .lockscreen {
    @include scene-rule;
    @include scene-advanced;

    // Clocks
    &__clock {
      text-align: center;
    }

    .time {
      font-family: var(--f-family-heading);
      font-size: var(--f-size-4l);
      font-weight: 400;
      line-height: 1.2;

      text-shadow: var(--clock-shadow-rule);

      display: block;
      color: var(--text-color);
    }

    .date {
      font-family: var(--f-family-heading);
      font-size: var(--f-size-xl);
      font-weight: 400;
      line-height: 1.2;

      text-shadow: var(--clock-shadow-rule);

      display: block;
      color: var(--text-color);
    }

    // Footer
    &__footer {
      padding: var(--size-m);

      background-color: rgba(58, 58, 58, 0.7);
      border-bottom-left-radius: var(--b-radius-s);
      border-bottom-right-radius: var(--b-radius-s);

      .description {
        font-size: var(--f-size-m);
        font-weight: 400;
        line-height: 1.2;

        display: block;
        color: var(--text-color);
      }
    }

    &__unlock {
      @include flex-column;

      & {
        align-items: center;
        text-align: center;

        row-gap: var(--size-m);
      }
    }
  }
</style>
