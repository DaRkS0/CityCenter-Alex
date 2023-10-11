import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

// place files you want to import through the `$lib` alias in this folder.
export { InteractionManager as InteractionManager } from "$lib/Interactive";
export { LoadGLTF as LoadGLTF } from "$lib/utils";
export { CreateMixer as CreateMixer } from "$lib/utils";
export { ColorGUIHelper as ColorGUIHelper } from "$lib/utils";
export type AnchorMarker = {
  animated: boolean;
  path: string;
  type?: "Model" | "Video" | "Image";
  onload?: (gltf: GLTF) => void | undefined;
  onclick?: () => void | undefined;
};
