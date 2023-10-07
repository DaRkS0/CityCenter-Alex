<script>
  // @ts-nocheck

  // import ARnft from "@webarkit/ar-nft";
  import * as THREE from "three";
  //import { MindARThree } from "$libs/Mind-Ar/image-target";
  import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";
  import { onMount } from "svelte";
  // import ARnftThreejs from "@webarkit/arnft-threejs";

  onMount(async () => {
    const mindarThree = new MindARThree({
      container: document.body,
      imageTargetSrc:
        "https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.2/examples/image-tracking/assets/card-example/card.mind",
    });
    const { renderer, scene, camera } = mindarThree;
    const anchor = mindarThree.addAnchor(0);
    const geometry = new THREE.PlaneGeometry(1, 0.55);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.5,
    });
    const plane = new THREE.Mesh(geometry, material);
    anchor.group.add(plane);
    const start = async () => {
      await mindarThree.start();
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });
    };
    // const startButton = document.querySelector("#startButton");
    // const stopButton = document.querySelector("#stopButton");

    // startButton.addEventListener("click", () => {
    //   start();
    // });
    // stopButton.addEventListener("click", () => {
    //   mindarThree.stop();
    //   mindarThree.renderer.setAnimationLoop(null);
    // });

    start();
  });
</script>

<div id="control">
  <!-- <button id="startButton">Start</button>
  <button id="stopButton">Stop</button> -->
</div>
<div id="container" />

<style>
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
