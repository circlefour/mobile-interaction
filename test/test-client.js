const { io } = require("socket.io-client");

const createFakeDevice = (id) => {
  const socket = io("http://localhost:3000");

  socket.on("connect", () => {
    console.log(`device ${id} connected: ${socket.id}`);

    setInterval(() => {
      const fakeAccel = {
        x: Math.random() * 10,
        y: Math.random() * 10,
        z: Math.random() * 10,
      }
      socket.emit("shake", fakeAccel);
    }, 10);
  });

  socket.on("disconnect", () => {
    console.log(`device ${id} disconnected`);
  });
};

// simulate 5 devices
for (let i = 0; i < 5; i++) {
  createFakeDevice(i + 1);
}

