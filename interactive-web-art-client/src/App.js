import socketIO from 'socket.io-client';
import './App.css';

const socket = socketIO.connect('http://localhost:4000');

function App() {
  return (
    <div className="App">
      <p>Hello Sockets</p>
    </div>
  );
}

export default App;
