const http = require("http");
const express = require("express");
const ip = require("ip");
const socketio = require("socket.io");
const { setInterval } = require("timers/promises");

const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server, {
  cors: {
    origin: "*",
  },
});

app.use("/", express.static(__dirname + "/layout/build"));
app.use((_req, res) => {
  res.sendFile(__dirname + "/layout/build/index.html");
});

const timer = setInterval(1000, () => {});

io.on("connection", (socket) => {
  console.log("Có kết nối đến!");
  setTimeout(() => {
    socket.emit("time", "1:58");
  }, 1000);
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Dịch vụ đã được khởi chạy tại cổng: ${PORT}`);
  console.log(
    `Kết nối thông qua địa chỉ http://localhost:${PORT} hoặc http://${ip.address()}:${PORT}`
  );
});
