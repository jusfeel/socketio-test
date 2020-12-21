const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  // ...
});

io.on("connection", (socket) => {
  //console.log('server connection..');
});

const workspaces = io.of(/^\/\w+$/);

workspaces.on('connection', socket => {
  const workspace = socket.nsp;
  console.log('connected to ', workspace.name);
  socket.send(`hello from server[nsp]:${workspace.name}`);

  // workspace.emit('hello');
  socket.on('disconnecting', () => {
    const rooms = Object.keys(socket.rooms);
    // the rooms array contains at least the socket ID
    console.log('disconnecting..');
  });

  socket.on('disconnect', () => {
    // socket.rooms === {}
    console.log('disconnected..');
  });

  socket.on('message', (data) => {
    console.log(data);
  });

});

workspaces.on('message', socket => {
  const workspace = socket.nsp;
  console.log('disconnected to ', workspace.name);
});

workspaces.on('disconnect', socket => {
  const workspace = socket.nsp;
  console.log('disconnected to ', workspace.name);
});

httpServer.listen(3000);
