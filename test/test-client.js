const { io } = require("socket.io-client");

const createFakeDevice = (id) => {
  const socket = io("http://localhost:3000");

  socket.on("connect", () => {
    console.log(`Device ${id} connected: ${socket.id}`);

    setInterval(() => {
      //const fakeValue = Math.random() * 10; // Replace with real accelerometer-style data
      const fakeAccel = {
        x: Math.random() * 10,
        y: Math.random() * 10,
        z: Math.random() * 10,
      }
      socket.emit("shake", fakeAccel);
    }, 10); // Sends data every second (1000)
  });

  socket.on("disconnect", () => {
    console.log(`Device ${id} disconnected`);
  });
};

// Simulate 5 devices
for (let i = 0; i < 5; i++) {
  createFakeDevice(i + 1);
}

