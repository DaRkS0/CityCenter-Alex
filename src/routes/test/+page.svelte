<script>
  // @ts-nocheck
  // @ts-ignore

  import { onMount } from "svelte";

  // https://html-classic.itch.zone/html/9694083/Build/Build%20test%202.framework.js
  let buildUrl = "/build";
  let loaderUrl = buildUrl + "/Build test 2.loader.js";
  let config = {
    dataUrl: buildUrl + "/Build test 2.data",
    frameworkUrl: buildUrl + "/Build test 2.framework.js",
    codeUrl: buildUrl + "/Build test 2.wasm",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "DefaultCompany",
    productName: "Coca Cola Augmented Reality",
    productVersion: "0.1",
    // showBanner: unityShowBanner,
  };
  let canvas;
  onMount(async () => {
    /* @vite-ignore */
    // await import(loaderUrl);
    // createUnityInstance(canvas, config);
    var script = document.createElement("script");
    script.src = loaderUrl;
    script.onload = () => {
      createUnityInstance(canvas, config);
    };
    document.body.appendChild(script);
  });
</script>

<div class="h-full w-full">
  <div id="unity-container" class="unity-desktop">
    <canvas bind:this={canvas} id="unity-canvas" width="960" height="600"
    ></canvas>
    <div id="unity-loading-bar">
      <div id="unity-logo"></div>
      <div id="unity-progress-bar-empty">
        <div id="unity-progress-bar-full"></div>
      </div>
    </div>
    <div id="unity-warning"></div>
    <div id="unity-footer">
      <div id="unity-webgl-logo"></div>
      <div id="unity-fullscreen-button"></div>
      <div id="unity-build-title">Coca Cola Augmented Reality</div>
    </div>
  </div>
</div>
