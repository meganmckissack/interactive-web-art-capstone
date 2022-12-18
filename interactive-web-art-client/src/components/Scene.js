import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import * as dat from 'lil-gui';
// import { useCanvas } from '../hooks/useCanvas.js';
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Sky, OrbitControls } from '@react-three/drei'
import Tree from "./Tree.js";
// import Leaf from "./Leaf.js";
import Svg from "./LeafShape";
import { ReverseSubtractEquation } from "three";

// const style = {
//   padding: "10px"
// };


function Scene({ socket }) {
  const [users, setUsers] = useState([]);
  // const [ coordinates, setCoordinates, canvasRef, canvasWidth, canvasHeight ] = useCanvas();
  const [coordinates, setCoordinates] = useState([]);
  const navigate = useNavigate();
  const [leaves, setLeaves] = useState([]);
  
  useEffect(() => {
    socket.on('newUserResponse', (data) => setUsers(data));
  }, [socket, users]);

  //sends user back to splash page, removes usename from local storage and refreshes the browser window
  const handleLeaveScene = () => {
    localStorage.removeItem('userName');
    navigate('/');  
    window.location.reload();
  }

  // const addSvg = (e) => {
  //   const currentCoord = { x: e.clientX, y: e.clientY };
  //   setCoordinates([...coordinates, currentCoord]);

  //   setSvg(
  //     [
  //       ...svg,
  //       <Svg
  //       position={currentCoord}
  //       />
  //     ]
  //   )
  // }
  
  

  // const eventHandler = (event) => {
  //   console.log(event);
  //   const currentCoord = { x: event.clientX, y: event.clientY };
  //   // // const currentCoord = event.point;
  //   setCoordinates([...coordinates, currentCoord]);
  //   // generateNewLeaf();
  // }

  // const treeRef = useRef();
  // useFrame(({ mouse, event }) => {
  //   const x = (mouse.x * event.clientX) / 2;
  //   const y = (mouse.y * viewport.height) / 2;
  //   meshRef.current.position.set(x, y, 0);
  //   meshRef.current.position.set(-y, x, 0);
  // })
  

  // const handleCanvasClick = (event) => {
  //   //get user mouse location
  //   const currentCoord = { x: event.clientX, y: event.clientY };
  //   //add newest location to array in state
  //   setCoordinates([...coordinates, currentCoord]);
  // }



  return (
    <React.Fragment>
      <div style={{ width: "95vw", height: "95vh" }}>
      {/* <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        onClick={handleCanvasClick}
      /> */}
      {/* Canvas object is portal into Threejs, renders Threejs elements, not DOM elements */}
      <Canvas
      // onPointerDown={ eventHandler }
      onClick={() => generateNewLeaf()}
      camera={{ position: [0, 0, 3]}}
      onCreated={({ gl }) => gl.setClearColor('#e7f0e4')}>
      <Sky azimuth={5} inclination={0.6} distance={1000} />
      <ambientLight intensity={0.5} />
      
      {/* <pointLight position={[10, 10, 10]} intensity={0.05} /> */}
      {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} /> */}
      <Tree />
      {leaves.map((props, i) => (
        <Svg key={i} {...props} />
      ))}
      
        
        {/* <Leaf />  */}
        <OrbitControls />
        {/* {[...svg]} */}
        {/* <Svg 
        // onClick={addSvg}
        // position={[-1.5, 0, 1.5]}
        /> */}
        {/* <mesh onClick={() => console.log("hia")}>
          <boxGeometry attach="geometry" args={[50, 10]} />
        </mesh> */}
      </Canvas>
      
      <div className="usernames" >
        {users.map((user) => (
          <p key={user.socketID}>{user.userName}</p>
        ))}
      </div>
      <div className="goBack-button">
        <button onClick={handleLeaveScene}>Leave Experience</button>
      </div>
      </div>
    </React.Fragment>
  );

  function generateNewLeaf() {
    const total = leaves.length;
    let newLeaves = leaves.map((props) => ({...props}))
    newLeaves.push({ position: [coordinates, total *  1 - 1, 1]})
    setLeaves([...newLeaves])
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
  }
}

export default Scene;