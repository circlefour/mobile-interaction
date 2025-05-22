// import the express library
const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
// i forgot what all this means / does
const io = new Server(server, {
  cors: {
    origin: "*", // actually put in vercel url here when deployed so it's more specific
    methods: ["GET", "POST"],
  }
});

app.get('/', (req, res) => {
  res.send('<p>it is working</p>');
});

const connectedDevices = new Map(); // or {}

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  connectedDevices.set(socket.id, null);

  socket.on('shake', (chaos) => {
    //console.log('chaos level: ', chaos);
    connectedDevices.set(socket.id, chaos);
    console.log("All values:", Array.from(connectedDevices.values()));
  });
  socket.on("disconnect", () => {
    console.log("Device disconnected:", socket.id);
    connectedDevices.delete(socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});
