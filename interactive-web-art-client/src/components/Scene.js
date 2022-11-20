import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Scene({ socket }) {
  const [users, setUsers] = useState([]);
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

  return (
    <React.Fragment>
      <div className="usernames">
        {users.map((user) => (
          <p key={user.socketID}>{user.userName}</p>
        ))}
      </div>
      <div className="goBack-button">
        <button onClick={handleLeaveScene}>Leave Experience</button>
      </div>
    </React.Fragment>
  );
}

export default Scene;