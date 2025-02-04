const app = require("./index");
const PORT = process.env.SERVERPORT || 4000;

const Server = require("http").createServer(app);
const io = require("socket.io")(Server, {
  cors: {
    origin: [`http://localhost:3000`],
    credentials: true,
  },
});

io.on("connect", (socket) => {
  console.log("Connected :: %s", socket.id);

  io.emit("enter", `${socket.id} has enter.`);
  socket.on("message", (x) => {
    socket.broadcast.emit("message", x);
  });
  socket.on("disconnect", () => {
    console.log("DisConnected");
    socket.broadcast.emit("out", `${socket.id} has left.`);
  });
});

Server.listen(PORT, () => {
  console.log("Server running on port:: %s", PORT);
});
