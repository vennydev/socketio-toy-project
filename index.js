const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

io.socketsJoin('room1');

// make all Socket instances in the "room1" room join the "room2" and "room3" rooms
io.in('room1').socketsJoin(['room2', 'room3']);

// make all Socket instances leave the "room1" room
// io.socketsLeave('room1');

// // make all Socket instances in the "room1" room leave the "room2" and "room3" rooms
// io.in('room1').socketsLeave(['room2', 'room3']);

// // this also works with a single socket ID
// io.in(theSocketId).socketsLeave('room1');

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
