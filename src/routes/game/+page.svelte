<script lang="ts">
  import type * as THREE from "three";
  import type { AnchorMarker } from "$lib";
  import ARCanvas from "$lib/ARCanvas.svelte";
  import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
  import { afterUpdate, onMount } from "svelte";
  import type { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";
  import { secondsToMinutesAndSeconds, CreateImageObject } from "$lib/utils";
  import { page } from "$app/stores";
  import { UpdateDoc, GetDoc } from "$lib/firebase/database/client";
  import { goto } from "$app/navigation";

  const TimeLimst = 60;
  let GameOver = false;
  let Found: number[] = [];
  let gameStart = false;
  let AR: MindARThree;
  let Timecounter = 90;
  let TimeString = "";
  let Barcounter = 0;

  onMount(async () => {
    const time = secondsToMinutesAndSeconds(Timecounter);
    TimeString = `${time.minutes}:${time.seconds}`;

    const info = await GetDoc(
      "Invitees",
      $page.url.searchParams.get("uid") ?? "Temp"
    );
    if (!info.exists() || (info.exists() && info.get("score") !== undefined))
      goto(".");
  });

  function modelOne(gltf: GLTF) {
    gltf.scene.rotateX(Math.PI / 2);
    gltf.scene.rotateY(Math.PI / 2);
  }

  function modelTwo(gltf: GLTF) {
    gltf.scene.scale.set(0.1, 0.1, 0.1);
    gltf.scene.position.set(0, -0.4, 0);
  }
  afterUpdate(() => {
    // console.log(AR);
    // setTimeout(() => {
    //   AR.stop();
    // }, 15000);
  });

  function GetMarkrs() {
    let group: AnchorMarker[] = [];
    for (let index = 0; index < 17; index++) {
      const test: AnchorMarker = {
        animated: false,
        type: "Image",
        path: "print-03.png",
        onload: (model) => {
          const ss = model as THREE.Object3D;
          ss.scale.set(0.6, 0.6, 0.6);
        },
        onclick: async (Coinanchor, model) => {
          if (Coinanchor && !Found.includes(Coinanchor.targetIndex)) {
            console.log("Cliked On GoldBar");
            const immg = await CreateImageObject("pngwing.com.png", 0.6, 0.6);
            immg.position.set(0, 0, 0.2);
            //  Coinanchor?.group.add(immg);
            Found = [...Found, Coinanchor.targetIndex];
          }
        },
      };
      group.push(test);
    }
    return group;
  }
</script>

<div class:hidden={GameOver} class=" w-full h-full overflow-hidden">
  <ARCanvas
    imageTargetSrc="https://raw.githubusercontent.com/DaRkS0/CityCenter-Alex/main/static/examples/targets.mind"
    maxTrack={3}
    anchors={GetMarkrs()}
    on:loaded={() => {
      console.log("Ar Ready");
      gameStart = true;
      const key = setInterval(async () => {
        if (--Timecounter === 0) {
          clearInterval(key);
          await AR.stop();
          GameOver = true;
          //scanning
          const scan = document.querySelector(".scanning");
          if (scan !== null) {
            scan.style.display = "none";
          }

          const info = await UpdateDoc(
            "Invitees",
            $page.url.searchParams.get("uid") ?? "Temp",
            {
              score: Found.length,
            }
          );
        }
        const time = secondsToMinutesAndSeconds(Timecounter);
        TimeString = `${time.minutes}:${time.seconds}`;
      }, 1000);
    }}
    bind:AR
  />
</div>

<div
  class="absolute z-50 inset-0 pointer-events-none w-full h-full overflow-hidden flex flex-col items-center pt-7 px-12 gap-8"
>
  <img src="img/title.webp" alt="" />
  <div class="w-full">
    <p
      class:hidden={GameOver || !gameStart}
      class="text-3xl font-bold text-white text-left mb-2"
    >
      {TimeString}
    </p>
    <!-- <p class:hidden={GameOver} class="text-lg text-left">{Found.length}</p> -->
  </div>

  <img
    class:hidden={!GameOver}
    class="my-auto max-w-[75%]"
    src="img/hero.webp"
    alt=""
  />

  <div
    class:hidden={!GameOver}
    class="flex items-center gap-4 max-w-full px-8 mb-auto"
  >
    <img class="my-auto" src="img/found.webp" alt="" />
    <p class="text-4xl font-bold text-white">{Found.length}</p>
  </div>
</div>
