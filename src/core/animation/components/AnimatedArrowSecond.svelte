<!-- <script lang="ts">
  import type { SvelteHTMLElements } from "svelte/elements";
  import { onMount } from "svelte";
  import { gsap } from "@/services/gsap";

  type Props = SvelteHTMLElements["svg"] & {
    strokeColor?: string;
    width?: number;
    height?: number;
  };

  let { strokeColor = "currentColor", width = 120, height = 80, ...restProps }: Props = $props();

  onMount(() => {
    const tl = gsap.timeline();

    tl.from(
      "#arrow",
      {
        drawSVG: "0%",
        duration: 1.5,
        ease: "power1.inOut",
      },
      "-=0.2",
    );
  });
</script>

<svg {width} {height} viewBox="0 0 96 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...restProps}>
  <path
    id="arrow"
    d="M92.5681 2.50018C71.8063 17.5062 57.2731 25.4252 31.7716 20.6437C25.5822 19.4832 15.4133 18.3755 10.445 13.9592C7.62295 11.4507 3.24946 11.2167 8.74741 9.07852C13.2751 7.31772 19.8406 4.40999 24.7689 4.40999C26.5487 4.40999 9.12202 9.05429 3.76061 10.2457C-3.09384 11.7688 20.0637 33.1271 23.814 36.8773"
    stroke={strokeColor}
    stroke-width="5"
    stroke-linecap="round"
  />
</svg> -->

<script lang="ts">
  import type { SvelteHTMLElements } from "svelte/elements";

  type Props = SvelteHTMLElements["svg"] & {
    strokeColor?: string;
    width?: number;
    height?: number;
    bodyId?: string;
    tipId?: string;
  };

  let {
    strokeColor = "currentColor",
    width = 200,
    height = 265,
    bodyId = "arrow-bodyv2",
    tipId = "arrow-tipv2",
    ...restProps
  }: Props = $props();
</script>

<svg {width} {height} viewBox="0 0 144 163" fill="none" xmlns="http://www.w3.org/2000/svg" {...restProps}>
  <path
    d="M2.50018 28.1596C15.229 26.9255 51.5017 22.9863 57.4501 41.5954C59.9252 49.3386 58.9372 61.37 53.8001 68.1562C42.7682 82.7295 15.7616 74.4662 31.432 56.1129C40.2203 45.82 57.2221 47.7031 69.2429 49.2023C86.9624 51.4123 97.9718 62.0634 108.645 75.3623C114.066 82.1161 131.976 118.928 129.378 118.396"
    id={bodyId}
    stroke={strokeColor}
    stroke-width="5"
    stroke-linecap="round"
  />
  <path
    d="M137.742 131.063C135.088 130.422 114.929 124.865 117.3 125.865C120.403 127.175 123.74 128.204 126.661 129.891C130.117 131.886 134.022 132.979 137.232 135.341C140.048 137.413 139.486 119.025 138.651 115.911"
    id={tipId}
    stroke={strokeColor}
    stroke-width="5"
    stroke-linecap="round"
  />
</svg>
