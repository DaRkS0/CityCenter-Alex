<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import * as THREE from "three";
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
      "config_brave_robot.json",
      true
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
          renderer.outputEncoding = THREE.SRGBColorSpace;
          renderer.physicallyCorrectLights = true;
          let directionalLight = new THREE.DirectionalLight("#fff", 0.4);
          directionalLight.position.set(0.5, 0, 0.866);
          scene.add(directionalLight);

          let nftAddTJS = new ARnftThreejs.NFTaddTJS(nft.uuid);
          nftAddTJS.oef = true;
          // gLTF model provided by Brett Alistair Kromkamp https://github.com/brettkromkamp
          nftAddTJS.addModel(
            "examples/Data/models/brave_robot/gLTF/brave_robot.glb",
            "pinball",
            80,
            false
          );

          const tick = () => {
            sceneThreejs.draw();
            window.requestAnimationFrame(tick);
          };
          tick();
        });
      })
      .catch((error) => {
        console.log(error);
      });
    document.addEventListener("onInitThreejsRendering", (ev) => {
      // set here extra rendering settings after init
      console.log(
        "onInitThreejsRendering is available only outside containerEvent!"
      );
    });
    ////
  });
</script>

<a
  href="https://raw.githubusercontent.com/artoolkitx/artoolkit5/master/doc/Marker%20images/pinball.jpg"
  class="ui marker"
  target="_blank"
>
  🖼 Marker Image
</a>
