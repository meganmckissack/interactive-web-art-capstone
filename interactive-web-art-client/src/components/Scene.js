import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import * as dat from 'lil-gui';
// import { useCanvas } from '../hooks/useCanvas.js';
import { Canvas } from "@react-three/fiber";
import Tree from "./Tree.js";
// import Leaf from "./Leaf.js";

// const style = {
//   padding: "10px"
// };

function Scene({ socket }) {
  const [users, setUsers] = useState([]);
  // const [ coordinates, setCoordinates, canvasRef, canvasWidth, canvasHeight ] = useCanvas();
  const navigate = useNavigate();
  
  useEffect(() => {
    socket.on('newUserResponse', (data) => setUsers(data));
  }, [socket, users]);

  //sends user back to splash page, removes usename from local storage and refreshes the browser window
  const handleLeaveScene = () => {
    localStorage.removeItem('userName');
    navigate('/');  
    window.location.reload();
  }

  // const eventHandler = () => {
  //   console.log("click");
  // }

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
      <Canvas>
        <Tree />
        {/* <Leaf /> */}
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
}

export default Scene;