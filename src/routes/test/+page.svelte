<script>
  // @ts-nocheck
  // @ts-ignore
  import "./style.css";
  import { onMount } from "svelte";

  // https://html-classic.itch.zone/html/9694083/Build/Build%20test%202.framework.js
  let buildUrl = "/build";
  let loaderUrl = buildUrl + "/Build 3.loader.js";
  let config = {
    dataUrl: buildUrl + "/Build 3.data",
    frameworkUrl: buildUrl + "/Build 3.framework.js",
    codeUrl: buildUrl + "/Build 3.wasm",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "DefaultCompany",
    productName: "Coca Cola Augmented Reality",
    productVersion: "0.1",
    // showBanner: unityShowBanner,
  };
  let canvas;
  let mobile = false;
  let loaded = false;
  onMount(async () => {
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      // Mobile device style: fill the whole browser client area with the game canvas:
      mobile = true;
      const meta = document.getElementsByName("viewport")[0];

      // var meta = document.createElement("meta");

      // meta.name = "viewport";
      meta.content =
        "width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes";
      // document.getElementsByTagName("head")[0].appendChild(meta);
      //   container.className = "unity-mobile";
      //   canvas.className = "unity-mobile";

      // To lower canvas resolution on mobile devices to gain some
      // performance, uncomment the following line:
      // config.devicePixelRatio = 1;

      //unityShowBanner('WebGL builds are not supported on mobile devices.');
    }

    var script = document.createElement("script");
    script.src = loaderUrl;
    script.onload = () => {
      createUnityInstance(canvas, config, (prog) => {
        if (prog >= 1) {
          setTimeout(() => {
            loaded = true;
          }, 3500);
        }
      });
    };
    document.body.appendChild(script);
  });
</script>

<div class="h-full w-full">
  <div
    id="unity-container"
    class:unity-desktop={!mobile}
    class:unity-mobile={mobile}
  >
    <canvas
      bind:this={canvas}
      class:unity-mobile={mobile}
      id="unity-canvas"
      width="960"
      height="600"
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
  <div
    class:hidden={loaded}
    class="absolute z-20 inset-0 w-full h-full flex items-center justify-center bg-black gap-5"
  >
    <div
      class="w-12 h-12 rounded-full animate-spin border-y-4 border-solid border-pink-500 border-t-transparent shadow-md"
    ></div>

    <p class="text-white text-2xl">Loading..</p>
  </div>
</div>
