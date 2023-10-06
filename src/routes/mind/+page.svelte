<script>
  // @ts-nocheck

  // import ARnft from "@webarkit/ar-nft";

  import { onMount } from "svelte";
  // import ARnftThreejs from "@webarkit/arnft-threejs";

  onMount(async () => {
    if ("xr" in window.navigator) {
      console.log({ xr: navigator.xr });
      const session = await navigator.xr.requestSession("immersive-ar", {
        requiredFeatures: ["image-tracking"],
      });
      /* WebXR can be used! */
    } else {
      console.log("WebXR isn't available");
      /* WebXR isn't available */
    }
  });
</script>

<div id="control">
  <button id="startButton">Start</button>
  <button id="stopButton">Stop</button>
</div>
<div id="container" />

<style>
  body {
    margin: 0;
  }
  #container {
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
  }
  #control {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
  }
</style>
