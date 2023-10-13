<script lang="ts">
  import * as THREE from "three";
  //import type { MindARThree as ARBase } from "$lib/Mind-Ar/mindar-image-three.prod";
  import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";
  import { createEventDispatcher, onMount } from "svelte";

  import { LoadGLTF, InteractionManager, CreateMixer } from "$lib";
  import type { AnchorMarker } from "$lib";
  import { CreateVideoObject, CreateImageObject } from "./utils";
  export let imageTargetSrc = "";
  export let maxTrack = 1;
  export let anchors: AnchorMarker[];
  let container: HTMLDivElement;
  let mixers: THREE.AnimationMixer[] = [];
  let clock = new THREE.Clock();
  export let AR: MindARThree | undefined = undefined;
  const dispatch = createEventDispatcher<{
    loaded: {};
  }>();
  onMount(async () => {
    const mindarThree = new MindARThree({
      container,
      imageTargetSrc,
      maxTrack,
      ...$$props,
    });

    container.addEventListener("arReady", (event) => {
      console.log("MindAR is ready");
    });
    const { renderer, scene, camera } = mindarThree;
    AR = mindarThree;
    // let directionalLight = new THREE.DirectionalLight("#fff", 0.6);
    let directionalLight = new THREE.DirectionalLight("#fff", 1.3);

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
      } else if (a.type === "Image") {
        //549 239
        const obj = await CreateImageObject(a.path, 1, 239 / 549);

        if (a.onload !== undefined) a.onload(obj);
        interactionManager.add(obj);
        obj.addEventListener("click", () => {
          if (a.onclick !== undefined && anchor.visible) a.onclick(anchor);
        });
        anchor.group.add(obj);
      } else {
        const gltf = await LoadGLTF(a.path);

        if (a.onload !== undefined) a.onload(gltf);

        if (a.animated) {
          mixers.push(await CreateMixer(gltf));
        }

        const model = gltf.scene.children[0];
        interactionManager.add(model);
        model.addEventListener("click", () => {
          if (a.onclick !== undefined && anchor.visible) a.onclick(anchor);
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
    dispatch("loaded", {});
    // const cc = setInterval(() => {
    //   const loader = document.querySelector(".loader");
    //   console.log(loader);
    //   clearInterval(cc);
    //   //
    // }, 1000);
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
