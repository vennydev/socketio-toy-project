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

// room workspace 만들기

// const room = io.of('/room');
// const chat = io.of('/chat');

// room.on('connection', (socket) => {
//  console.log('room 네임스페이스에 접속');
//   socket.on('disconnectSockets', () => {
//     console.log('room 네임스페이스 접속 해제');
//   });
// });

// chat.on('connection', (socket) => {
//   console.log('chat 네임스페이스에 접속');
//   const req = socket.request;
//   const {
//     headers: { referer },
//   } = req;
//   const roomId = referer
//     .split('/')
//     [referrer.split('/').length - 1].replace(/\?.+/, '');
//   socket.join(roomId);

//   socket.on('disconnectSockets', () => {
//     console.log('chat 네임스페이스 접속 해제');
//     socket.leave(roomId);
//   });
// });

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
