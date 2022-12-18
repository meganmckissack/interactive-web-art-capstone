import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Splash({ socket }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('userName', userName);  //name doesn't go to server, no authentication, just stored locally
    socket.emit('newUser', { userName, socketID: socket.id });  //sends username and id to server
    navigate('/scene');
  }

  return (
    <React.Fragment>
      <h2>Add your name and join</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'></label>
        <input 
          type='text'
          name='username'
          id='username'
          placeholder='username'
          onChange={(event) => setUserName(event.target.value)}
        />
      <button>Join In</button>
      </form>
    </React.Fragment>
  );
}

export default Splash;