declare module "mind-ar/dist/mindar-image-three.prod.js" {
  import {
    Matrix4,
    Vector3,
    Quaternion,
    Scene,
    WebGLRenderer,
    PerspectiveCamera,
    Group,
    sRGBEncoding,
  } from "three";
  import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
  type AROptions = {
    container: HTMLElement;
    imageTargetSrc: string;
    maxTrack?: number;
    uiLoading?: string;
    uiScanning?: string;
    uiError?: string;
  };
  type ARAnchor = {
    group: Group;
    targetIndex: number;
    onTargetFound?: () => any | null;
    onTargetLost?: () => any | null;
    onTargetUpdate?: () => any | null;
    //   css?: boolean = false;
    //   visible?: boolean = false;
  };
  declare class MindARThree {
    constructor(options: AROptions) {}
    renderer: WebGLRenderer;
    camera: PerspectiveCamera;
    scene: Scene;
    cssScene: Scene;
    cssRenderer: CSS3DRenderer;
    start: () => Promise<void>;
    stop: () => void;
    switchCamera: () => void;
    resize(): () => void;
    addAnchor: (number) => ARAnchor;
    addCSSAnchor: (number) => ARAnchor;
  }
}
