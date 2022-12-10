import { useLoader } from '@react-three/fiber';
import React from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function Tree () {
  const treeModel = useLoader(GLTFLoader, './tree-stump.glb');
  
  return (
    <React.Fragment>
      <primitive object={ treeModel.scene } />
    </React.Fragment>
  )
}

export default Tree;