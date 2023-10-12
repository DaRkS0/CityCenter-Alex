<script lang="ts">
  import type { AnchorMarker } from "$lib";
  import ARCanvas from "$lib/ARCanvas.svelte";

  import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
  import { afterUpdate } from "svelte";
  import type { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";
  import { CreateVideoObject, CreateImageObject } from "$lib/utils";
  let barDOne = false;
  let AR: MindARThree;
  let anchors: AnchorMarker[] = [
    // {
    //   animated: false,
    //   type: "Model",
    //   path: "examples/Data/models/bear/scene.gltf",
    //   // path: "https://avo-content-dev.s3.amazonaws.com/videos/bg_1588085276090.mp4",
    //   onload: modelOne,
    //   onclick: async (Coinanchor, model) => {
    //     const immg = await CreateImageObject("pngwing.com.png", 0.6, 0.6);
    //     immg.position.set(0, 0, 0.2);
    //     Coinanchor?.group.add(immg);
    //     model?.addEventListener("click", () => {});
    //     // model?.addEventListener("click",undefined);
    //   },
    // },
    {
      animated: false,
      path: "examples/Data/models/gold-bar/untitled.gltf",
      onload: modelOne,
      onclick: async (Coinanchor, model) => {
        if (!barDOne) {
          console.log("Cliked On GoldBar");
          const immg = await CreateImageObject("pngwing.com.png", 0.6, 0.6);
          immg.position.set(0, 0, 0.2);
          Coinanchor?.group.add(immg);
          barDOne = true;
        }
      },
    },
    {
      animated: true,
      path: "examples/Data/models/bear/scene.gltf",
      onload: modelTwo,
      onclick: () => console.log("Cliked On Bear"),
    },
    {
      animated: true,
      path: "examples/Data/models/raccoon/scene.gltf",
      onload: modelTwo,
      onclick: () => console.log("Cliked On Raccoon"),
    },
  ];

  function modelOne(gltf: GLTF) {
    gltf.scene.rotateX(Math.PI / 2);
    gltf.scene.rotateY(Math.PI / 2);
  }

  function modelTwo(gltf: GLTF) {
    gltf.scene.scale.set(0.1, 0.1, 0.1);
    gltf.scene.position.set(0, -0.4, 0);
  }
  afterUpdate(() => {
    // console.log(AR);
    // setTimeout(() => {
    //   AR.stop();
    // }, 15000);
  });
</script>

<div class=" w-full h-full overflow-hidden">
  <ARCanvas
    imageTargetSrc="examples/targets.mind"
    uiScanning="no"
    maxTrack={3}
    {anchors}
    bind:AR
  />
</div>
<div
  class="absolute z-50 inset-0 pointer-events-none w-full h-full overflow-hidden flex flex-col items-center pt-7 px-12"
>
  <img src="img/title.webp" alt="" />
</div>
