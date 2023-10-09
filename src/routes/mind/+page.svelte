<script>
  // @ts-nocheck
  import * as THREE from "three";
  import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";
  import { onMount } from "svelte";
  import {
    LoadGLTF,
    InteractionManager,
    CreateMixer,
    ColorGUIHelper,
  } from "$lib";
  import GUI from "lil-gui";

  onMount(async () => {
    const mindarThree = new MindARThree({
      //container: document.body,
      container: document.querySelector("#container"),
      imageTargetSrc: "examples/targets.mind",
      maxTrack: 3,
    });
    const { renderer, scene, camera } = mindarThree;

    const Coinanchor = mindarThree.addAnchor(0);
    const Bearanchor = mindarThree.addAnchor(1);
    const Racoonanchor = mindarThree.addAnchor(2);

    const interactionManager = new InteractionManager(
      renderer,
      camera,
      document.querySelector("#container")
    );
    // const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);

    // scene.add(light);

    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);
    const gui = new GUI();
    gui.addColor(new ColorGUIHelper(light, "color"), "value").name("color");
    gui.add(light, "intensity", 0, 2, 0.01);
    let directionalLight = new THREE.DirectionalLight("#fff", 0.6);
    directionalLight.position.set(0.5, 0, 0.866);
    scene.add(directionalLight);

    const Coinangltf = await LoadGLTF(
      "examples/Data/models/gold-bar/untitled.gltf"
    );
    //  Coinangltf.scene.rotateX(Math.PI / 2);
    // Coinangltf.scene.rotateY(Math.PI / 2);
    //Coinangltf.scene.scale.set(1, 5, 1, 5, 0.1);
    // Coinangltf.scene.position.set(0, -0.4, 0);

    const model = Coinangltf.scene.children[0];
    interactionManager.add(model);
    model.addEventListener("click", () => {
      console.log("Cliked On COin");
    });

    Coinanchor.group.add(Coinangltf.scene);

    const Beargltf = await LoadGLTF("examples/Data/models/bear/scene.gltf");
    Beargltf.scene.scale.set(0.1, 0.1, 0.1);
    Beargltf.scene.position.set(0, -0.4, 0);
    Bearanchor.group.add(Beargltf.scene);

    const Racoongltf = await LoadGLTF(
      "examples/Data/models/raccoon/scene.gltf"
    );
    Racoongltf.scene.scale.set(0.1, 0.1, 0.1);
    Racoongltf.scene.position.set(0, -0.4, 0);
    Racoonanchor.group.add(Racoongltf.scene);

    // gltf.scene.rotateX(Math.PI / 2);
    // gltf.scene.rotateY(Math.PI * 1.5);

    // Coinanchor
    let clock = new THREE.Clock();
    let mixers = [];
    // mixers.push(await CreateMixer(Coinangltf));
    mixers.push(await CreateMixer(Beargltf));
    mixers.push(await CreateMixer(Racoongltf));

    // const model = gltf.scene.children[0];
    // console.log(model);
    // interactionManager.add(model);
    // model.addEventListener("click", () => {
    //   console.log("Cliked On COin");
    //   // Cliked = true;
    //   // setTimeout(() => {
    //   //   Cliked = false;
    //   // }, 2000);
    // });
    const start = async () => {
      await mindarThree.start();
      renderer.setAnimationLoop(() => {
        // mixer.update(clock.getDelta());
        const Delta = clock.getDelta();
        mixers.forEach((mixer) => mixer.update(Delta));
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

<div
  id="container"
  class="flex flex-col items-stretch justify-stretch relative w-full h-full overflow-hidden"
/>

<style>
  :global(video) {
    /* left: 0px !important;
    right: 0px !important; */
    inset: 0 !important;
  }
  /* #container {
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
  } */
</style>
