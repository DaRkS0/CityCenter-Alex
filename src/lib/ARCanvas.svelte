<script lang="ts">
  import * as THREE from "three";
  //import type { MindARThree as ARBase } from "$lib/Mind-Ar/mindar-image-three.prod";
  import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";
  import { onMount } from "svelte";
  import { LoadGLTF, InteractionManager, CreateMixer } from "$lib";
  import type { AnchorMarker } from "$lib";
  import { CreateVideoObject } from "./utils";
  export let imageTargetSrc = "";
  export let maxTrack = 1;
  export let anchors: AnchorMarker[];
  let container: HTMLDivElement;
  let mixers: THREE.AnimationMixer[] = [];
  let clock = new THREE.Clock();
  export let AR: MindARThree | undefined = undefined;
  onMount(async () => {
    const mindarThree = new MindARThree({
      container,
      imageTargetSrc,
      maxTrack,
      ...$$props,
    });
    const { renderer, scene, camera } = mindarThree;
    AR = mindarThree;
    let directionalLight = new THREE.DirectionalLight("#fff", 0.6);
    directionalLight.position.set(0.5, 0, 0.866);
    scene.add(directionalLight);

    const interactionManager = new InteractionManager(
      renderer,
      camera,
      container
    );
    clock = new THREE.Clock();

    anchors.forEach(async (a, id) => {
      const anchor = mindarThree.addAnchor(id);
      if (a.type === "Video") {
        const obj = await CreateVideoObject(a.path);
        anchor.group.add(obj.plane);
        anchor.onTargetFound = () => obj.video.play();
        anchor.onTargetLost = () => obj.video.pause();
      } else {
        const gltf = await LoadGLTF(a.path);

        if (a.onload !== undefined) a.onload(gltf);

        if (a.animated) {
          mixers.push(await CreateMixer(gltf));
        }

        const model = gltf.scene.children[0];
        interactionManager.add(model);
        model.addEventListener("click", () => {
          if (a.onclick !== undefined && anchor.visible) a.onclick();
        });
        anchor.group.add(gltf.scene);
      }
    });

    const start = async () => {
      await mindarThree.start();
      renderer.setAnimationLoop(() => {
        const Delta = clock.getDelta();
        mixers.forEach((mixer) => mixer.update(Delta));
        renderer.render(scene, camera);
      });
    };
    await start();
  });
</script>

<div
  id="container"
  bind:this={container}
  class="flex flex-col items-stretch justify-stretch relative w-full h-full overflow-hidden"
/>

<style>
  :global(#container video) {
    inset: 0 !important;
  }
</style>
