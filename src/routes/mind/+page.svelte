<script>
  // @ts-nocheck

  // import ARnft from "@webarkit/ar-nft";
  import * as THREE from "three";
  //import { MindARThree } from "$libs/Mind-Ar/image-target";
  import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";
  import { onMount } from "svelte";
  import { LoadGLTF, InteractionManager } from "$lib";
  // import ARnftThreejs from "@webarkit/arnft-threejs";

  onMount(async () => {
    const mindarThree = new MindARThree({
      //container: document.body,
      container: document.querySelector("#container"),
      imageTargetSrc: "examples/targets.mind",
    });
    const { renderer, scene, camera } = mindarThree;
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    const anchor = mindarThree.addAnchor(0);
    const Coinanchor = mindarThree.addAnchor(1);

    const geometry = new THREE.PlaneGeometry(1, 0.55);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.5,
    });
    const interactionManager = new InteractionManager(
      renderer,
      camera,
      renderer.domElement
    );
    scene.add(light);

    let directionalLight = new THREE.DirectionalLight("#fff", 0.4);
    directionalLight.position.set(0.5, 0, 0.866);
    scene.add(directionalLight);

    const plane = new THREE.Mesh(geometry, material);
    //anchor.group.add(plane);
    const gltf = await LoadGLTF("examples/Data/models/raccoon/scene.gltf");

    //const gltf = await LoadGLTF("examples/Data/models/coin/scene.gltf");
    console.log(gltf);
    // gltf.scene.rotateX(Math.PI / 2);
    // gltf.scene.rotateY(Math.PI * 1.5);
    gltf.scene.scale.set(0.1, 0.1, 0.1);
    gltf.scene.position.set(0, -0.4, 0);
    //gltf.scene.position.set(0, 0, -30);

    const Coinangltf = await LoadGLTF("examples/Data/models/coin/scene.gltf");
    Coinangltf.scene.scale.set(0.1, 0.1, 0.1);
    Coinangltf.scene.position.set(0, -0.4, 0);

    Coinanchor.group.add(Coinangltf.scene);
    anchor.group.add(gltf.scene);

    // Coinanchor
    let clock = new THREE.Clock();
    const model = gltf.scene.children[0];
    let mixers = [];
    mixers.push(AddToMixer(gltf));
    mixers.push(AddToMixer(Coinangltf));

    console.log(model);
    interactionManager.add(model);
    model.addEventListener("click", () => {
      console.log("Cliked On COin");
      // Cliked = true;
      // setTimeout(() => {
      //   Cliked = false;
      // }, 2000);
    });
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

  function AddToMixer(gl) {
    const mixer = new THREE.AnimationMixer(gl.scene.children[0]);
    const action = mixer.clipAction(gl.animations[0]);
    action.play();
    return mixer;
  }
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
