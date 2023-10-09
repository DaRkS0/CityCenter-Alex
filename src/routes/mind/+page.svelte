<script lang="ts">
  import type { AnchorMarker } from "$lib";
  import ARCanvas from "$lib/ARCanvas.svelte";
  import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
  let anchors: AnchorMarker[] = [
    {
      animated: false,
      path: "examples/Data/models/gold-bar/untitled.gltf",
      onload: modelOne,
      onclick: () => console.log("Cliked On Bar"),
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
</script>

<div class=" w-full h-full overflow-hidden">
  <ARCanvas imageTargetSrc="examples/targets.mind" maxTrack={3} {anchors} />
</div>
