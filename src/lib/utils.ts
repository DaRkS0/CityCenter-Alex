import {
  GLTFLoader,
  type GLTF,
} from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

export function LoadGLTF(path: string) {
  return new Promise<GLTF>((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(path, resolve);
  });
}

export function CreateMixer(gl: GLTF, idx = 0) {
  return new Promise<THREE.AnimationMixer>((resolve) => {
    const mixer = new THREE.AnimationMixer(gl.scene.children[idx]);
    const action = mixer.clipAction(gl.animations[idx]);
    action.play();
    resolve(mixer);
  });
}

export function LoadVideo(path: string) {
  return new Promise<HTMLVideoElement>((resolve) => {
    const video = document.createElement("video");
    video.onloadeddata = () => resolve(video);
    video.crossOrigin = "anonymous";
    video.src = path;
  });
}

export async function CreateVideoObject(path: string, w = 1, h = 1) {
  return new Promise<{ plane: THREE.Mesh; video: HTMLVideoElement }>(
    async (resolve) => {
      const video = await LoadVideo(path);
      const texture = new THREE.VideoTexture(video);
      const mat = new THREE.MeshBasicMaterial({ map: texture });
      const planeGeom = new THREE.PlaneGeometry(w, h);
      resolve({
        plane: new THREE.Mesh(planeGeom, mat),
        video,
      });
    }
  );
}

export async function CreateImageObject(path: string, w = 1, h = 1) {
  return new Promise<THREE.Mesh>(async (resolve) => {
    const planeGeom = new THREE.PlaneGeometry(w, h);
    const texture = new THREE.TextureLoader().load(path);
    const material = new THREE.MeshBasicMaterial({
      transparent: true,
      map: texture,
    });
    const plane = new THREE.Mesh(planeGeom, material);
    //plane.scale.set(scale, scale, scale);
    resolve(plane);
  });
}

export function secondsToMinutesAndSeconds(totalSeconds: number) {
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  return {
    minutes,
    seconds,
  };
}
export class ColorGUIHelper {
  object: any;
  prop: any;
  constructor(object: any, prop: any) {
    this.object = object;
    this.prop = prop;
  }
  get value() {
    return `#${this.object[this.prop].getHexString()}`;
  }
  set value(hexString) {
    this.object[this.prop].set(hexString);
  }
}
