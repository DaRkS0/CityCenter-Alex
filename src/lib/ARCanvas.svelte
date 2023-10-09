<script lang="ts">
  import * as THREE from "three";
  import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";
  import { onMount } from "svelte";
  import { LoadGLTF, InteractionManager, CreateMixer } from "$lib";
  import type { AnchorMarker } from "$lib";

  export let imageTargetSrc = "";
  export let maxTrack = 1;
  export let anchors: AnchorMarker[];
  let container: HTMLDivElement;
  let mixers: THREE.AnimationMixer[] = [];
  let clock = new THREE.Clock();

  onMount(async () => {
    const mindarThree = new MindARThree({
      container,
      imageTargetSrc,
      maxTrack,
    });
    const { renderer, scene, camera } = mindarThree;
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
      const gltf = await LoadGLTF(a.path);
      let clickable = false;
      anchor.onTargetFound = () => (clickable = true);
      anchor.onTargetLost = () => (clickable = false);
      if (a.onload !== undefined) a.onload(gltf);

      if (a.animated) {
        mixers.push(await CreateMixer(gltf));
      }

      const model = gltf.scene.children[0];
      interactionManager.add(model);
      model.addEventListener("click", () => {
        if (a.onclick !== undefined && clickable) a.onclick();
      });
      anchor.group.add(gltf.scene);
    });

    const start = async () => {
      await mindarThree.start();

      const { video } = mindarThree;
      if (video) {
        (video as HTMLVideoElement).style.setProperty(
          "inset",
          "0px",
          "important"
        );
        console.log(video);
      }

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
