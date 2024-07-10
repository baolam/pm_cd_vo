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
        scores: 0,
      },
      blue_user: {
        name: "Another",
        hits: 0,
        gam_jeom: 0,
        hits: 0,
        won: 0,
        team: "CLB",
        scores: 0,
      },
      round: 1, // Thông tin tự cập nhật
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
// --------------------------------------
var main_timer; // Biến dùng để quản lí timeout
var current_match = 0;
var current_time = 0,
  memory_time = 0;
var preparation_time = 0;
var round_4_score = 0;
var pauseTime = false; // Biến làm nhấp nháy dấu : ở thời gian
// ----------------------------------------

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
 * Thủ tục xử lí thời gian thành chuỗi rồi gửi
 */
function showTime() {
  let second = current_time % 60;
  let minute = (current_time - second) / 60;
  let time = `${minute}:${second}`;
  if (pauseTime) time = `${minute} ${second}`;
  io.sockets.emit("time", time);
}

/**
 * @description
 * Hàm dùng để xử lí thời gian
 */
function processTimer() {
  if (!pauseTime) {
    current_time--;
  }
  if (current_time > 0) {
    showTime();
    pauseTime = !pauseTime;
    main_timer = setTimeout(processTimer, 500);
  } else {
    current_time = memory_time;
    matches[current_match].round++;
    if (matches[current_match].round >= 3) {
      // Tiến hành xử lí kết thúc trận đấu...
      // Xử lí dựa vào tình trạng điểm số hiện tại
      current_time = 0;
    }
  }
}

io.on("connection", (socket) => {
  console.log("Có kết nối từ người dùng!");

  socket.emit("match", {
    ...matches[current_match],
    match: {
      match: current_match + 1,
      round: matches[current_match].round,
      pauseTime,
    },
  });

  socket.on("start_round", (infor) => {
    current_time = infor.timeRound;
    memory_time = infor.timeRound;
    preparation_time = infor.preparation_time;
    round_4_score = infor.round_4;
    main_timer = setTimeout(processTimer, 500);
  });

  socket.on("end_round", () => {
    clearTimeout(main_timer);
  });

  socket.on("update_score", (infor) => {
    let target_user = matches[current_match].red_user;
    if (infor.code == "B") target_user = matches[current_match].blue_user;

    if (infor.score == -1 && target_user.scores > 0) target_user.scores--;
    if (infor.score != -1) {
      target_user.scores++;
      target_user.hits++;
    }

    if (infor.code == "R") matches[current_match].red_user = target_user;
    else matches[current_match].blue_user = target_user;

    updateInforScreen();
  });

  socket.on("update_gam_jeom", (infor) => {
    let target_user = matches[current_match].red_user;
    let guest = matches[current_match].blue_user;
    if (infor.code == "B") {
      let tmp = target_user;
      target_user = guest;
      guest = tmp;
    }

    if (infor.error == 1) {
      target_user.gam_jeom++;
      guest.scores++;
    } else {
      if (target_user.gam_jeom > 0) {
        target_user.gam_jeom--;
        guest.scores--;
      }
    }

    if (infor.code == "R") {
      matches[current_match].red_user = target_user;
      matches[current_match].blue_user = guest;
    } else {
      matches[current_match].red_user = guest;
      matches[current_match].blue_user = target_user;
    }

    updateInforScreen();
  });
});

server.listen(PORT, () => {
  console.log(`Dịch vụ đã được khởi chạy tại cổng: ${PORT}`);
  console.log(
    `Kết nối thông qua địa chỉ http://localhost:${PORT} hoặc http://${ip.address()}:${PORT}`
  );
});
