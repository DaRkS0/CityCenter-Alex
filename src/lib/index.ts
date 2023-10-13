import type { ARAnchor } from "mind-ar/dist/mindar-image-three.prod.js";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import type { Object3D, Object3DEventMap } from "three";

// place files you want to import through the `$lib` alias in this folder.
export { InteractionManager as InteractionManager } from "$lib/Interactive";
export { LoadGLTF as LoadGLTF } from "$lib/utils";
export { CreateMixer as CreateMixer } from "$lib/utils";
export { ColorGUIHelper as ColorGUIHelper } from "$lib/utils";
export type AnchorMarker = {
  animated: boolean;
  path: string;
  type?: "Model" | "Video" | "Image";
  onload?: (gltf: GLTF | THREE.Object3D) => void | Promise<void> | undefined;
  onclick?: (
    anchor?: ARAnchor,
    model?: Object3D<Object3DEventMap>
  ) => void | Promise<void> | undefined;
};
