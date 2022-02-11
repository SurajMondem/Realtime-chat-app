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
  const id = socket.handshake.query.id;
  socket.join(id)

  socket.on('send-message', ({recipients, text}) => {
    recipients.forEach(recipient => {
      const newRecipient = recipients.filter(r => r !== recipient)
      newRecipient.push(id)
      socket.broadcast.to(recipient).emit('recieve-message', {
        recipients: newRecipient, sender: id, text
      })
    })


  })
})

server.listen(PORT, err => {
  if(err) console.log(err);
  console.log(`Listening on PORT: ${PORT}`);
})