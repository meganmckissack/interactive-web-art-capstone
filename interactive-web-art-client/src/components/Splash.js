import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tree from './Tree';

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
      <form onSubmit={handleSubmit}>
        <h2>Sign in to play</h2>
        <label htmlFor='username'>Username</label>
        <input 
          type='text'
          name='username'
          id='username'
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
      <button>Sign In</button>
      </form>
      <Tree />
    </React.Fragment>
  );
}

export default Splash;