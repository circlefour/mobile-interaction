// import the express library
const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const { avgChaos } = require('./utils/chaos');

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

let watcher = null;
const deviceChaos = new Map(); // or {}

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('watcher', () => {
    console.log('watcher connected:', socket.id);
    watcher = socket;
  });
  socket.on('shake', (chaos) => {
    if (socket !== watcher) deviceChaos.set(socket.id, chaos);
    const avgchaos = avgChaos(deviceChaos);
    if (watcher) watcher.emit('chaos', avgchaos);
  });
  socket.on("disconnect", () => {
    console.log("Device disconnected:", socket.id);
    deviceChaos.delete(socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});
