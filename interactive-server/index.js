//import express server and set to port 4000
const express = require('express');
const app = express();
const port = 4000;

//import http and cors to allow request between client and server
const http = require('http').Server(app);
const cors = require('cors');

//import socket.io and set cors origin 
const socketIO = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000"
  }
});

app.use(cors());

//connects to client app and creates unique id for each socket/user
socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello Sockets',
  });
});

http.listen(port, () => {
  console.log(`server listening on port ${ port }`);
});