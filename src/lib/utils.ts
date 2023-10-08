import {
  GLTFLoader,
  type GLTF,
} from "three/examples/jsm/loaders/GLTFLoader.js";

export function LoadGLTF(path: string) {
  return new Promise<GLTF>((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(path, resolve);
  });
}
