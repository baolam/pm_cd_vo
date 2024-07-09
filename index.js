const http = require("http");
const express = require("express");
const ip = require("ip");
const socketio = require("socket.io");
const xlsx = require("xlsx"); // Dành để đọc file excel

const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server, {
  cors: {
    origin: "*",
  },
});

/// Một số thông số quan trọng
const PORT = process.env.PORT || 4000;
const EXCEL_FILE = "";

/// Phần chương trình xử lí file excel
console.log(`Đang tiến hành đọc và xử lí file excel ${EXCEL_FILE}!`);
function read_excel_file() {
  return [
    {
      red_user: {
        name: "Person",
        hits: 0,
        gam_jeom: 0,
        hits: 0,
        won: 0,
        team: "CLB",
      },
      blue_user: {
        name: "Another",
        hits: 0,
        gam_jeom: 0,
        hits: 0,
        won: 0,
        team: "CLB",
      },
      round: 1, // Thông tin tự cập nhật
      pauseTime: false,
    },
  ];
}

const matches = read_excel_file();
// Lưu ý:
// Nếu file không đọc được
// Chuyển đổi sang trạng thái người dùng tự do
console.log("Hoàn thành xử lí");
console.log("-----------------------------------------------------");

// Thông tin dùng quản lí
var current_match = 0;

app.use("/", express.static(__dirname + "/layout/build"));
app.use((_req, res) => {
  res.sendFile(__dirname + "/layout/build/index.html");
});

/**
 * @description
 * Cập nhật các thông tin (điểm số, bàn thắng, thua) cho toàn bộ người dùng
 */
function updateInforScreen() {
  io.sockets.emit("content", {
    ...matches[current_match],
    match: {
      match: current_match + 1,
      round: matches[current_match].round,
    },
  });
}

/**
 * @description
 * Bản thời gian cài đặt cho trận đấu
 */
function timerForMatch() {}

io.on("connection", (socket) => {
  console.log("Có kết nối từ người dùng!");
  socket.emit("match", {
    ...matches[current_match],
    match: {
      match: current_match + 1,
      round: matches[current_match].round,
      pauseTime: matches[current_match].pauseTime,
    },
  });
});

server.listen(PORT, () => {
  console.log(`Dịch vụ đã được khởi chạy tại cổng: ${PORT}`);
  console.log(
    `Kết nối thông qua địa chỉ http://localhost:${PORT} hoặc http://${ip.address()}:${PORT}`
  );
});
