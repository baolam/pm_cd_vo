const http = require("http");
const express = require("express");
const ip = require("ip");

const app = express();
const server = http.createServer(app);

app.use("/", express.static(__dirname + "/layout/build"));
app.use((_req, res) => {
  res.sendFile(__dirname + "/layout/build/index.html");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Dịch vụ đã được khởi chạy tại cổng: ${PORT}`);
  console.log(
    `Kết nối thông qua địa chỉ http://localhost:${PORT} hoặc http://${ip.address()}:${PORT}`
  );
});
