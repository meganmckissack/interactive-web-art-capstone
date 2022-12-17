// import * as THREE from 'three';
// import React, { useState, useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
// import flatten from 'lodash-es/flatten';
// import { SVGLoader as loader } from 'three/examples/jsm/loaders/SVGLoader';
import React, { useRef, useState } from 'react';
import LeafSvg from '../assets/leaf.svg';
import Logo from '../logo.svg';

// // Promise of an SVG parsed into paths 
// // with which the threejs engine will make shapes
// const svgResource = new Promise(resolve =>
//   new loader().load(Logo, shapes => {
//       resolve(flatten(shapes.paths.map((group, index) => {
//           return group.toShapes(true).map(shape => {
//               const fillColor = group.userData.style.fill
//               return ({ shape, color: fillColor, index })
//           })
//       }))
//       )
//   })
// )

// function SvgShape({shape, color, index}) {
//   const mesh = useRef();
//   return (
//       <mesh
//           ref={mesh}
//       >
//           <shapeBufferGeometry attach="geometry" args={[shape]} />
//           <meshBasicMaterial
//               aspect={window.innerWidth / window.innerHeight}
//               attach="material"
//               color={color}
//               opacity={1}
//               side={THREE.DoubleSide}
//               flatShading={true}
//               depthWrite={true}
//               /*
//         HACK: Offset SVG polygons by index
//         The paths from SVGLoader Z-fight.
//         This fix causes stacking problems with detailed SVGs.
//       */
//               polygonOffset
//               polygonOffsetFactor={index * -0.1}
//           />
//       </mesh>
//   );
// }

// function LeafShape() {
//   const [shapes, set] = useState([]);
//   useEffect(() => svgResource.then(set), []);
//   return (
//       <group 
//           color={new THREE.Color(0xb0b0b0)} 
//           position={[-50, 100, 10]}
//           scale={[0.125, 0.125, 0.125]}
//           >
//           {shapes.map(item =>  
//               <SvgShape key={item.shape.uuid} {...item} />
//           )}
//       </group>
//   );
// }

// SvgShape.propTypes = {
//   color: PropTypes.any,
//   index: PropTypes.any,
//   shape: PropTypes.shape
// }

// export default LeafShape;

// import React, { Suspense, useMemo } from 'react'
// import { Box } from "@react-three/drei"
// import { useLoader } from "@react-three/fiber"
// import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'

// const DefaultModel = () => (
//   <Box args={[1, 1, 1]}>
//     <meshBasicMaterial attach="material" color="hotpink" />
//   </Box>
// )

// const SvgShape = ({ shape, color, index }) => (
//   <mesh>
//     <meshLambertMaterial
//       attach="material"
//       color={color}
//       /*
//         HACK: Offset SVG polygons by index
//         The paths from SVGLoader Z-fight.
//         This fix causes stacking problems with detailed SVGs.
//       */
//       polygonOffset
//       polygonOffsetFactor={index * -0.1}
//     />
//     <shapeBufferGeometry attach="geometry" args={[shape]} />
//   </mesh>
// )

// const SvgAsync = React.memo(({ url, sceneRef }) => {
//   const { paths } = useLoader(SVGLoader, url)
//   const shapes = useMemo(
//     () =>
//       paths.flatMap((path, index) =>
//         path.toShapes(true).map(shape => ({ index, shape, color: path.color }))
//       ),
//     [paths]
//   )
//   return (
//     <group
//       ref={sceneRef}
//       children={shapes.map((props, key) => (
//         <SvgShape key={key} {...props} />
//       ))}
//       rotation={[-Math.PI / 2, 0, Math.PI]}
//       scale={[-0.01, 0.01, 0.01]}
//     />
//   )
// })

// const Svg = props => (
//   <Suspense
//     fallback={<DefaultModel {...props} />}
//     children={<SvgAsync {...props} />}
//   />
// )

// export default Svg

// import * as THREE from 'three'
// import ReactDOM from 'react-dom'
// import React, { useState, useEffect } from 'react'
// // import { Canvas } from 'react-three-fiber'
// import { useTransition, a } from '@react-spring/web'
// import flatten from 'lodash-es/flatten'
// import { SVGLoader as loader } from 'three/examples/jsm/loaders/SVGLoader';


// const svgResource = new Promise(resolve =>
//   new loader().load(Logo, shapes =>
//     resolve(flatten(shapes.map((group, index) => group.toShapes(true).map(shape => ({ shape, color: group.color, index })))))
//   )
// )

// function Shape({ shape, position, color, opacity, index }) {
//   return (
//     <a.mesh position={position.interpolate((x, y, z) => [x, y, z + -index * 50])}>
//       <a.meshPhongMaterial attach="material" color={color} opacity={opacity} side={THREE.DoubleSide} depthWrite={false} transparent />
//       <shapeBufferGeometry attach="geometry" args={[shape]} />
//     </a.mesh>
//   )
// }

// function Svg() {
//   const [show, toggle] = useState(true)
//   const [shapes, set] = useState([])
//   useEffect(() => void (!show ? set([]) : svgResource.then(set)), [show])
//   useEffect(() => void setInterval(() => toggle(show => !show), 4000), [])

//   const transitions = useTransition(shapes, item => item.shape.uuid, {
//     from: { position: [0, 50, -200], opacity: 0 },
//     enter: { position: [0, 0, 0], opacity: 1 },
//     leave: { position: [0, -50, 10], opacity: 0 },
//     order: ['leave', 'enter', 'update'],
//     trail: 30,
//     lazy: true
//   })

//   return (
//     <group position={[1600, -700, 0]} >
//       {transitions.map(({ item, key, props }) => (
//         <Shape key={key} {...item} {...props} />
//       ))}
//     </group>
//   )
// }

// export default Svg;

import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { SVGLoader } from 'three-stdlib'


function SVG(props) {
  const { viewport } = useThree;
  const svg = useLoader(SVGLoader, LeafSvg)
  const shapes = SVGLoader.createShapes(svg.paths[0])

  const [active, setActive] = useState(false);
  const meshRef = useRef();
  // useFrame(({ mouse }) => {
  //   const x = (mouse.x * viewport.width) / 2;
  //   const y = (mouse.y * viewport.height) / 2;
  //   meshRef.current.position.set(x, y, 0);
  //   meshRef.current.position.set(-y, x, 0);
  // })

  const eventHandler = (event) => {
    console.log('point', event.point);
    // meshRef.current.position.set(event);
  }


  const extrudeSettings = {
    curveSegments: 12,
    steps: 1,
    depth: 2,
    bevelThickness: 0.5,
    bevelSize: 1,
    bevelSegments: 3
  }

  return (
    <mesh {...props} ref={meshRef} scale={0.1} rotation-x={Math.PI} onClick={ eventHandler }>
      <extrudeGeometry args={[shapes, extrudeSettings]} />
      <meshNormalMaterial />
    </mesh>
  )
}

export default SVG;