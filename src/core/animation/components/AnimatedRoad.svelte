<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { gsap } from "@/core/services/gsap";
  import type { SlideController } from "@/core/controller/SlideController";

  type Props = { index: number };
  let { index }: Props = $props();

  const controller = getContext<SlideController>("sceneController");

  // array svg pathes
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
      console.log("[effect] → restart");
      roadsTimeline?.pause(0).restart();
    } else {
      console.log("[effect] → pause");
      roadsTimeline?.pause(0);
    }
  });
</script>

<svg
  width="1715"
  height="922"
  viewBox="0 0 1715 922"
  fill="none"
  class="route-overlay"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <marker id="glow-dot" markerWidth="20" markerHeight="20" refX="10" refY="10" markerUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="8" fill="#DA2C2F" opacity="0.4" />
      <circle cx="10" cy="10" r="4.2" fill="#1d1d1d" />
    </marker>
  </defs>

  <g id="shape-main-container">
    <!-- Путь 0 -->
    <g class="strokes">
      <path
        bind:this={paths[0]}
        class="route-path"
        d="M959,919L954,862L952,827L953,813L959,804L976,796L992,787L999,776L1014,755L1024,742L1035,730L1040,725"
      />
    </g>

    <!-- Путь 1 -->
    <g class="strokes">
      <path
        bind:this={paths[1]}
        class="route-path"
        d="M1249,751L1220,746L1198,748L1153,758L1127,709L1111,690L1093,678L1079,674L1095,632L1108,597L1112,565"
      />
    </g>

    <!-- Путь 2 -->
    <g class="strokes">
      <path
        bind:this={paths[2]}
        class="route-path"
        d="M8,471L152,421L300,361L372,327L482,268L503,246L515,251L544,272L570,288L598,252"
      />
    </g>

    <!-- Путь 3 -->
    <g class="strokes">
      <path
        bind:this={paths[3]}
        class="route-path"
        d="M404,5L416,37L444,104L433,107L411,107L394,115L374,125L359,132L353,133L336,133L327,135L297,152L318,202L341,256"
      />
    </g>

    <!-- Путь 4 -->
    <g class="strokes">
      <path
        bind:this={paths[4]}
        class="route-path"
        d="M1503,912L1490,850L1477,806L1428,808L1405,808L1387,812L1371,807L1298,699L1305,690L1356,656L1308,584L1278,535L1249,513L1228,508L1127,506L960,505"
      />
    </g>

    <!-- Путь 5 -->
    <g class="strokes">
      <path
        bind:this={paths[5]}
        class="route-path"
        d="M1668,773L1569,795L1517,807L1492,806L1482,805L1474,794L1466,764L1416,724L1383,695L1360,659L1325,602L1327,593L1338,581L1346,572L1341,571L1332,579L1320,595L1292,620L1267,636L1260,634L1243,640L1234,623L1229,611L1209,585"
      />
    </g>

    <!-- Путь 6 -->
    <g class="strokes">
      <path bind:this={paths[6]} class="route-path" d="M583,920L729,849L743,838" />
    </g>

    <!-- Путь 7 -->
    <g class="strokes">
      <path bind:this={paths[7]} class="route-path" d="M717,770L761,762L749,694L847,681" />
    </g>

    <!-- Путь 8 -->
    <g class="strokes">
      <path
        bind:this={paths[8]}
        class="route-path"
        d="M539,877L539,832L540,812L544,796L618,795L677,778L667,683L666,666L671,650L743,636L838,619L837,599L855,574L888,537"
      />
    </g>

    <!-- Путь 9 -->
    <g class="strokes">
      <path
        bind:this={paths[9]}
        class="route-path"
        d="M1018,632L1051,570L1063,511L1073,501L1070,466L1068,448L1035,409L1008,382L965,347L930,316L916,309L888,284L886,276L826,229L794,204L783,190L765,157L721,59L669,80"
      />
    </g>

    <!-- Путь 10 -->
    <g class="strokes">
      <path bind:this={paths[10]} class="route-path" d="M712,502L625,393L619,366L634,332L693,255" />
    </g>

    <!-- Путь 11 -->
    <g class="strokes">
      <path
        bind:this={paths[11]}
        class="route-path"
        d="M1709,221L1615,211L1515,216L1420,206L1378,202L1338,193L1310,179L1258,164L1241,182L1107,155"
      />
    </g>

    <!-- Путь 12 -->
    <g class="strokes">
      <path bind:this={paths[12]} class="route-path" d="M6,849L68,829L48,772L168,727L248,699L271,756L367,722" />
    </g>

    <!-- Путь 13 -->
    <g class="strokes">
      <path
        bind:this={paths[13]}
        class="route-path"
        d="M424,683L441,596L468,547L493,476L504,404L510,370L506,320L505,294L525,268L526,248L548,215L564,192L613,125L546,69L540,6"
      />
    </g>

    <!-- Путь 14 -->
    <g class="strokes">
      <path
        bind:this={paths[14]}
        class="route-path"
        d="M1711,659L1572,607L1536,595L1524,593L1598,563L1583,521L1559,511L1537,489"
      />
    </g>

    <!-- Путь 15 -->
    <g class="strokes">
      <path bind:this={paths[15]} class="route-path" d="M1183,7L1205,42L1134,69L1081,91L1094,126L1048,145L1076,214" />
    </g>

    <!-- Путь 16 -->
    <g class="strokes">
      <path
        bind:this={paths[16]}
        class="route-path"
        d="M5,14L6,27L9,56L9,73L9,105L8,142L3,154L14,164L49,181L93,208L161,250L185,265L221,266L244,282L266,310L299,345L321,326"
      />
    </g>

    <!-- Путь 17 -->
    <g class="strokes">
      <path bind:this={paths[17]} class="route-path" d="M912,5L932,50L949,75L937,79L918,106L900,130L896,144L919,171" />
    </g>

    <!-- Путь 18 -->
    <g class="strokes">
      <path
        bind:this={paths[18]}
        class="route-path"
        d="M1710,47L1702,67L1698,77L1691,79L1675,75L1666,72L1658,72L1648,80L1638,77L1621,82L1644,145L1693,272L1677,266L1667,268L1658,276L1646,286L1636,289L1616,294L1606,298L1600,305L1595,314L1589,322L1581,329L1566,330L1560,330L1552,337L1547,341L1536,341L1527,346L1520,356L1515,367L1515,379L1519,388C1519,388,1519,392,1518,392C1517,392,1510,390,1510,390L1470,377L1453,373L1445,370L1438,364L1423,357L1346,332L1296,316L1307,283"
      />
    </g>
  </g>
</svg>

<style lang="scss">
  @use "$styles/_mixins.scss" as *;
  @use "$styles/_helpers.scss" as *;

  .route-overlay {
    position: absolute;
    // top: 0;
    // bottom: 0;
    // left: 0;
    // right: 0;
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
    // stroke: var(--secondary-bg);
    stroke: var(--road-stroke-color);
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    opacity: 0;

    marker-end: url(#glow-dot);
  }
</style>
