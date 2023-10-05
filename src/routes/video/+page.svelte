<script>
  // @ts-nocheck

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

          let nftAddTJS = new ARnftThreejs.NFTaddTJS(nft.uuid);
          nftAddTJS.oef = true;
          // Set width, height and width and height number of segments of the PlaneGeometry.
          let imgConfig = { w: 1, h: 1, ws: 1, hs: 1 };
          nftAddTJS.addVideo("arvideo", "pinball", 180, imgConfig, false);

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
<video
  loop
  autoplay
  muted
  webkit-playsinline
  playsinline
  crossOrigin="anonymous"
  id="arvideo"
>
  <source
    src="https://avo-content-dev.s3.amazonaws.com/videos/bg_1588085276090.mp4"
    type="video/mp4"
  />
</video>
