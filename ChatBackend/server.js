const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
// const { clearInterval } = require('timers');

const PORT = 8080;
const FRONTEND_PORT = 1234;
const index = require('./routes/index');

const app = express();
app.use(index);
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: `http://localhost:${FRONTEND_PORT}`
  }
});

io.on('connection', (socket) => {
  console.log('new client connected: ', socket.id);
  let interval;
  if(interval){
    clearInterval(interval);
  }
  interval = setInterval(() => {
    return getApiAndEmit(socket)
  }, 1000);

  // socket.join('chat room')

  socket.on('disconnect', (reason) => {
    console.log('Client Disconnected', reason);
    clearInterval(interval);
  })
})

const getApiAndEmit = socket => {
  const response = new Date();
  
  socket.emit('FromAPI', response);
}

server.listen(PORT, err => {
  if(err) console.log(err);
  console.log(`Listening on PORT: ${PORT}`);
})