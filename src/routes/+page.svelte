<script>
  // import ARnft from "@webarkit/ar-nft";
  import { onMount } from "svelte";
  // import ARnftThreejs from "@webarkit/arnft-threejs";
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
      "config.json",
      true
    )
      .then((nft) => {
        let mat = new THREE.MeshLambertMaterial({
          color: 0xff0000,
        });
        let boxGeom = new THREE.BoxGeometry(1, 1, 1);
        let cube = new THREE.Mesh(boxGeom, mat);
        cube.position.z = 90;
        cube.scale.set(180, 180, 180);

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
            // @ts-ignore
            config,
            canvas,
            // @ts-ignore
            nft.uuid,
            true
          );
          sceneThreejs.initRenderer();

          // @ts-ignore
          let nftAddTJS = new ARnftThreejs.NFTaddTJS(nft.uuid);
          nftAddTJS.oef = true;
          nftAddTJS.add(cube, "pinball", false);

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
  });
</script>

<a
  href="https://raw.githubusercontent.com/artoolkitx/artoolkit5/master/doc/Marker%20images/pinball.jpg"
  class="ui marker"
  target="_blank"
>
  🖼 Marker Image
</a>
