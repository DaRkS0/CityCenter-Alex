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

export function CreateMixer(gl: GLTF) {
  return new Promise<THREE.AnimationMixer>((resolve) => {
    const mixer = new THREE.AnimationMixer(gl.scene.children[0]);
    const action = mixer.clipAction(gl.animations[0]);
    action.play();
    resolve(mixer);
  });
}
