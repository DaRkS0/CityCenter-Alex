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
    /**
     * cutoff frequency decreasing the value of filterMinCF can reduce the jittering
     * default is 0.001
     */
    filterMinCF?: number;
    /**
     * speed coefficien increasing the value of filterBeta reduce the delay
     * default is 1 = 1000
     */
    filterBeta?: number;

    /**
     *  the target image being detected in a continuos of warmupTolerance frames to be considered a success. The default value of warmupTolerance is 5
     */
    warmupTolerance?: number;

    /**
     * the target image being un-detected in a continuous of missTolerance frames. The default value of missTolerance is 5
     */
    missTolerance?: number;

    userDeviceId?: string | number;

    environmentDeviceId?: string | number;
  };

  type ARAnchor = {
    group: Group;
    targetIndex: number;
    onTargetFound?: () => any | null;
    onTargetLost?: () => any | null;
    onTargetUpdate?: () => any | null;
    css: boolean;
    visible: boolean;
  };
  /**
   * Main Ar File
   */
  declare class MindARThree {
    constructor(options: AROptions) {}
    anchors: ARAnchor[];
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
    video: HTMLVideoElement;
  }
}
