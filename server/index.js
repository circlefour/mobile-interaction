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

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('shake', (chaos) => {
    console.log('chaos level: ', chaos);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});
