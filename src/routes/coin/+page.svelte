<script>
  // @ts-nocheck

  // import ARnft from "@webarkit/ar-nft";
  import { onMount } from "svelte";
  // import ARnftThreejs from "@webarkit/arnft-threejs";
  import * as THREE from "three";
  import { InteractionManager } from "$lib/Interactive";
  let Cliked = false;
  onMount(async () => {
    const ARnft = (await import("@webarkit/ar-nft")).default;
    const ARnftThreejs = (await import("@webarkit/arnft-threejs")).default;

    let width = 640;
    let height = 480;
    ARnft.ARnft.init(
      width,
      height,
      [["examples/DataNFT/pinball"]],
      [["pinball"]],
      "config.json",
      false
    )
      .then((nft) => {
        document.addEventListener("containerEvent", function (ev) {
          let canvas = document.getElementById("canvas");
          let fov = (0.8 * 180) / Math.PI;
          let ratio = width / height;
          let config = {
            renderer: {
              alpha: true,
              antialias: true,
              context: null,
              precision: "mediump",
              premultipliedAlpha: true,
              stencil: true,
              depth: true,
              logarithmicDepthBuffer: true,
            },
            camera: {
              fov: fov,
              ratio: ratio,
              near: 0.01,
              far: 1000,
            },
          };

          let sceneThreejs = new ARnftThreejs.SceneRendererTJS(
            config,
            canvas,
            nft.uuid,
            true
          );
          sceneThreejs.initRenderer();

          const renderer = sceneThreejs.getRenderer();
          const scene = sceneThreejs.getScene();

          const interactionManager = new InteractionManager(
            renderer,
            sceneThreejs.getCamera(),
            renderer.domElement
          );

          renderer.outputEncoding = THREE.sRGBEncoding;
          renderer.physicallyCorrectLights = true;
          let directionalLight = new THREE.DirectionalLight("#fff", 0.4);
          directionalLight.position.set(0.5, 0, 0.866);
          scene.add(directionalLight);

          let nftAddTJS = new ARnftThreejs.NFTaddTJS(nft.uuid);
          nftAddTJS.oef = true;
          let mixers = [];
          let clock = new THREE.Clock();
          let loged = false;
          function modelAnimation(gltf) {
            var model = gltf.scene.children[0];

            interactionManager.add(model);
            model.addEventListener("click", () => {
              console.log("Cliked On COin");
              Cliked = true;
              setTimeout(() => {
                Cliked = false;
              }, 2000);
            });
            if (!loged) {
              console.log(model);
              loged = true;
            }
            model.scale.x = 15;
            model.scale.y = 15;
            model.scale.z = 15;
            //  model.rotation.x = Math.PI / 2;
            var animation = gltf.animations[0];
            var mixer = new THREE.AnimationMixer(model);
            mixers.push(mixer);
            var action = mixer.clipAction(animation);
            action.play();
          }
          function updateAnimations() {
            if (mixers.length > 0) {
              for (var i = 0; i < mixers.length; i++) {
                mixers[i].update(clock.getDelta());
              }
            }
          }
          nftAddTJS.addModelWithCallback(
            "examples/Data/models/flamingo/gold_coin.glb",
            "pinball",
            modelAnimation,
            false
          );

          const tick = () => {
            interactionManager.update();
            sceneThreejs.draw();
            window.requestAnimationFrame(tick);
            updateAnimations();
          };
          tick();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });
</script>

<a
  href="https://raw.githubusercontent.com/artoolkitx/artoolkit5/master/doc/Marker%20images/pinball.jpg"
  class="ui marker"
  target="_blank"
>
  🖼 Marker Image
</a>

<div
  class="absolute z-50 inset-0 flex flex-col justify-center items-center pointer-events-none"
>
  <p class:hidden={!Cliked} class="text-5xl font-bold pointer-events-none">
    Clicked
  </p>
</div>
