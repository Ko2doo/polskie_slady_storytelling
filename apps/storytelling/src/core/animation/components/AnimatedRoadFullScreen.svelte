<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { gsap } from "@/core/services/gsap";

  import type { SlideController } from "@/core/controller/slideController.svelte";

  type Props = {
    index: number;
  };

  let { index }: Props = $props();

  const controller = getContext<SlideController>("sceneController");

  let paths = $state<(SVGPathElement | null)[]>([]);
  let roadsTimeline = $state<GSAPTimeline | undefined>();

  onMount(() => {
    const validPaths = paths.filter((path): path is SVGPathElement => path !== null);

    if (validPaths.length === 0) return;

    roadsTimeline = gsap.timeline({ paused: true });

    validPaths.forEach((path) => {
      const length = path.getTotalLength();

      roadsTimeline!.fromTo(
        path,
        {
          strokeDasharray: length,
          strokeDashoffset: length,
          autoAlpha: 1,
        },
        {
          strokeDashoffset: 0,
          duration: 2.3,
          ease: "power2.out",
        },
        "<+0.15",
      );
    });

    if (controller?.current === index) {
      roadsTimeline.restart();
    }

    return () => {
      roadsTimeline?.kill();
      roadsTimeline = undefined;
    };
  });

  $effect(() => {
    if (controller?.current === index) {
      roadsTimeline?.pause(0).restart();
    } else {
      roadsTimeline?.pause(0);
    }
  });
</script>

<svg
  width="1698"
  height="1023"
  viewBox="0 0 1698 1023"
  fill="none"
  class="route-overlay"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <marker id="glow-dot" markerWidth="20" markerHeight="20" refX="10" refY="10" markerUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="8" fill="#DA2C2F" opacity="0.4" />
      <circle cx="10" cy="10" r="4.2" fill="#1d1d1d" />
    </marker>
  </defs>

  <g id="shape-main-container">
    <g class="strokes">
      <path bind:this={paths[0]} class="route-path" d="M540,1021L720,935L720,924" />
    </g>

    <g class="strokes">
      <path
        bind:this={paths[1]}
        class="route-path"
        d="M890,1022C890,1021,881,983,881,983L882,975L951,961L958,959L955,904L956,898L961,891L968,887L988,879L997,873L1003,867L1007,861L1030,830L1040,816L1057,801"
      />
    </g>

    <g class="strokes">
      <path bind:this={paths[2]} class="route-path" d="M479,3L512,77L548,103L585,130L613,104" />
    </g>

    <g class="strokes">
      <path
        bind:this={paths[3]}
        class="route-path"
        d="M1209,4L1235,45L1099,97L1103,114L1078,120L1062,120L1050,116L1022,97L1001,77L982,72L977,69L950,81L987,162L1003,218L1008,235"
      />
    </g>

    <g class="strokes">
      <path bind:this={paths[4]} class="route-path" d="M844,4L779,33L807,100L758,162L756,165L712,226L637,327L604,304" />
    </g>

    <g class="strokes">
      <path
        bind:this={paths[5]}
        class="route-path"
        d="M6,489L231,405L240,403L259,430L281,457L299,475L316,492L335,507L355,512L371,513L395,513L407,512L446,509L440,537L432,568L415,611L402,637L389,661L377,714L369,753L371,757L378,758"
      />
    </g>

    <g class="strokes">
      <path
        bind:this={paths[6]}
        class="route-path"
        d="M6,991L17,996L21,992L24,988L12,960L11,954L22,932L30,931L37,933L62,944L85,956L90,958L93,957L97,956L101,958L103,961L103,969L108,974L119,979L146,924L172,869L181,849L195,842L208,841L291,857L347,867L359,819"
      />
    </g>

    <g class="strokes">
      <path
        bind:this={paths[7]}
        class="route-path"
        d="M404,767L506,731L564,729L636,723L724,707L782,695L816,589L823,581L781,533L756,499L890,383L982,481L1111,323L1173,249L1214,274L1291,333L1337,274"
      />
    </g>

    <g class="strokes">
      <path
        bind:this={paths[8]}
        class="route-path"
        d="M1694,869L1595,892L1545,893L1472,895L1457,895L1429,901L1419,892L1388,846L1376,850L1266,830L1259,840"
      />
    </g>

    <g class="strokes">
      <path
        bind:this={paths[9]}
        class="route-path"
        d="M5,230L143,188L153,185L176,185L217,173L230,169L233,176L243,174L313,213L340,196L347,196L355,196L358,194L400,205L401,205L410,201L423,203"
      />
    </g>

    <g class="strokes">
      <path
        bind:this={paths[10]}
        class="route-path"
        d="M1698,323L1681,329L1675,336L1666,349L1662,357L1653,364L1631,364L1628,364L1617,377L1608,376L1603,376L1597,379L1590,386L1586,394L1581,403L1579,414L1582,424L1583,430L1577,430L1564,425L1513,411L1508,410L1499,401L1467,390L1374,361L1337,349L1351,312"
      />
    </g>

    <g class="strokes">
      <path
        bind:this={paths[11]}
        class="route-path"
        d="M1480,1021L1426,995L1347,960L1292,944L1270,936L1185,851L1162,807L1149,785L1133,767L1119,755L1102,748L1101,732L1112,718L1114,705L1119,687L1130,655L1131,634L1134,622"
      />
    </g>
  </g>
</svg>

<style lang="scss">
  @use "$styles/_mixins.scss" as *;
  @use "$styles/_helpers.scss" as *;

  .route-overlay {
    position: absolute;

    top: rem(-10);
    left: rem(-10);
    right: rem(-10);
    bottom: rem(-10);

    width: calc(100% + #{rem(20)});
    height: calc(100% + #{rem(20)});

    pointer-events: none;
  }

  .route-path {
    fill: none;

    stroke: var(--road-stroke-color);
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;

    opacity: 0;

    marker-end: url(#glow-dot);
  }
</style>
