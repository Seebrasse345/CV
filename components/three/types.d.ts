import { Object3DNode } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Vector3 } from 'three';

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

// Add custom type declaration for Trail component from @react-three/drei
declare module '@react-three/drei' {
  export interface TrailProps {
    width?: number;
    length?: number;
    color?: string | number;
    attenuation?: (width: number) => number;
    target?: React.MutableRefObject<THREE.Object3D>;
    points?: Vector3[];
  }
  
  export const Trail: React.FC<TrailProps>;
} 