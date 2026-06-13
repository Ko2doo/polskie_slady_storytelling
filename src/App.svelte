<script lang="ts">
  import { setContext, onMount } from "svelte";
  import { i18n } from "@/services/i18n";
  import { localeCode } from "./locales";
  import { appState } from "@/core/state/app-state.svelte";

  import { createUIContext, POPUP_GROUP } from "@/services/UIController.svelte";
  import { slidesController } from "@/core/controller/slide-controller.svelte";

  // Icons
  import MaximizeIcon from "$assets/icons/ui/Maximize.svg?raw";
  import MinimizeIcon from "$assets/icons/ui/Minimize.svg?raw";
  import LocalesIcon from "$assets/icons/ui/Global.svg?raw";
  import LockIcon from "$assets/icons/ui/Lock.svg?raw";
  import SettingsIcon from "$assets/icons/ui/Settings.svg?raw";
  import SettingsDownIcon from "$assets/icons/ui/SettingsBold.svg?raw";

  import Navigation from "./Navigation.svelte";
  import Popup from "$libs/components/Popup.svelte";
  import Menu from "$libs/components/Menu.svelte";
  import Button from "$libs/components/Button.svelte";
  import BodyOverlay from "$libs/components/BodyOverlay.svelte";

  import Lockscreen from "./story/Lockscreen.svelte";
  import Intro from "./story/slides/intro/Intro.svelte";
  import History from "./story/slides/timeline/History.svelte";
  import AppInfo from "./story/slides/info/AppInfo.svelte";
  import Advantage from "./story/slides/advantage/Advantage.svelte";
  import OfflineNav from "./story/slides/map/OfflineNav.svelte";

  const ui = createUIContext();
  const sceneController = slidesController();
  const POPUP_ID = "settings";
  const SUBMENU_GROUP = "settings.locales";

  setContext("sceneController", sceneController);

  let triggerEl: HTMLButtonElement | undefined = $state();

  // Language
  const locales = Object.entries(localeCode);

  const languageSwitcher = (code: string): void => {
    $i18n.changeLanguage(code);
    ui.closeAll();
  };

  // Zen mode (F11 fullscreen mode)
  let zenModeState: boolean = $state(false);

  const zenModeToggler = (): void => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  $effect(() => {
    const handleFullscreenChange = () => {
      zenModeState = !!document.fullscreenElement;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "F11") {
        event.preventDefault();
        zenModeToggler();
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    window.addEventListener("keydown", handleKeyDown, { capture: true });

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
  });

  onMount(() => {
    const restoreIndex = appState.currentSlide;

    if (restoreIndex > 0) sceneController.jumpTo(restoreIndex);
  });
</script>

<BodyOverlay />

{#if appState.locked}
  <main class="container">
    <div class="viewport">
      <Lockscreen
        onUnlock={() => {
          appState.unlock();
          sceneController.jumpTo(0);
        }}
      />
    </div>
  </main>
{:else}
  <Navigation controller={sceneController} />

  <main class="container">
    <div class="viewport">
      <Intro index={0} controller={sceneController} />
      <History index={1} controller={sceneController} />
      <AppInfo index={2} controller={sceneController} />
      <Advantage index={3} controller={sceneController} />
      <OfflineNav index={4} controller={sceneController} />
    </div>
  </main>
{/if}

<Button
  bind:ref={triggerEl}
  buttonName="settings"
  onclick={() => ui.toggle(POPUP_ID, POPUP_GROUP)}
  data-btn-settings={ui.isOpen(POPUP_ID) ? "opened" : ""}
>
  {#snippet icon()}
    <span class="icon-wrapper" class:icon-wrapper--active={ui.isOpen(POPUP_ID)}>
      {@html ui.isOpen(POPUP_ID) ? SettingsDownIcon : SettingsIcon}
    </span>
  {/snippet}
</Button>

<Popup id={POPUP_ID} anchor={triggerEl} placement="bottom" offset={16}>
  <Button
    buttonName="menu-button"
    label={zenModeState ? $i18n.t("ui.popup.zenModeOff") : $i18n.t("ui.popup.zenModeOnn")}
    onclick={zenModeToggler}
  >
    {#snippet icon()}
      {@html zenModeState ? MinimizeIcon : MaximizeIcon}
    {/snippet}
  </Button>

  <Menu id="settings.translations" group={SUBMENU_GROUP} label={$i18n.t("ui.popup.translations")}>
    {#snippet icon()}
      {@html LocalesIcon}
    {/snippet}

    {#each locales as [code, label]}
      <Button buttonName="submenu-item" value={code} {label} onclick={() => languageSwitcher(code)} />
    {/each}
  </Menu>

  {#if !appState.locked}
    <Button buttonName="menu-button" label={$i18n.t("ui.popup.lock")} onclick={() => appState.lock()}>
      {#snippet icon()}
        {@html LockIcon}
      {/snippet}
    </Button>
  {/if}
</Popup>

<style lang="scss">
  @use "$styles/_mixins.scss" as *;
  @use "$styles/_helpers.scss" as *;

  .container {
    @include container;
  }

  .viewport {
    @include viewport;
  }

  .icon-wrapper {
    display: inline-flex;
    transition: transform 0.4s ease;
  }

  .icon-wrapper--active {
    transform: rotate(22deg);
  }

  :global([data-btn-settings="opened"]) {
    background-color: var(--general-bg);
  }
</style>
