import { Object3DNode } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: Object3DNode<OrbitControls, typeof OrbitControls>;
    }
  }
}

// Adding these declarations for buffer attributes
declare module '@react-three/fiber' {
  interface ThreeElements {
    bufferAttribute: JSX.IntrinsicElements['bufferGeometry'] & {
      attach: string;
      array: Float32Array;
      count: number;
      itemSize: number;
    };
    orbitControls: Object3DNode<OrbitControls, typeof OrbitControls>;
  }
} 