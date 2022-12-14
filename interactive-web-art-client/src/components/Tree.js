import React from 'react';
import { OrbitControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


function Tree () {
  const treeModel = useLoader(GLTFLoader, './tree-stump.glb');

  const clickHandler = () => {
    console.log("clicked");
  }
  
  return (
    <React.Fragment>
      <Perf position="top-left" />
      <OrbitControls makeDefault />

      <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
      <ambientLight intensity={ 0.5 } />

      <primitive object={ treeModel.scene } onClick={ clickHandler } />
      
    </React.Fragment>
  )
}

export default Tree;