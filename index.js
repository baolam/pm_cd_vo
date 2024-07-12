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
const EXCEL_FILE = __dirname + "/matches.xlsx";

/// Phần chương trình xử lí file excel
console.log(`Đang tiến hành đọc và xử lí file excel ${EXCEL_FILE}!`);
function __build_infor_user(name, team) {
  return {
    name,
    team,
    hits: 0,
    gam_jeom: 0,
    scores: 0,
    won: 0,
  };
}

function read_excel_file() {
  let workbook = xlsx.readFile(EXCEL_FILE);
  let worksheet = workbook.Sheets["tran_dau"];
  let _matches = xlsx.utils.sheet_to_json(worksheet, {
    raw: true,
    range: `A3:E${3 + worksheet["G1"].v}`,
  });
  let matches = [];
  for (let i = 0; i < _matches.length; i++) {
    let match = _matches[i];
    let red_user = __build_infor_user(match["Tên đỏ"], match["Đội đỏ"]);
    let blue_user = __build_infor_user(match["Tên xanh"], match["Đội xanh"]);
    matches.push({ red_user, blue_user, round: 1 });
  }
  /// Phần hiển thị thông báo
  console.log("Danh sách trận đấu nhận được...");
  console.table(_matches);
  console.log("-----------------------------------------------------");
  return matches;
}

const matches = read_excel_file();
// Thông tin dùng quản lí
// --------------------------------------
var main_timer, timer; // Biến dùng để quản lí timeout
var current_match = 0;
var current_time = 0,
  preparation_time = 0,
  memory_time = 0;
var turnDot = false; // Biến dùng để tinh chỉnh dấu : ở thời gian
var pauseTime = false; // Biến được dùng khi thời gian bị dừng
var interuptState = 0; // Biến dùng để điều khiển trạng thái của nút bấm săn sóc và xem xét
var timerState = false; // Biến chỉ trạng thái timer (false --> mainTimer, true --> timer)
var round_4_score = 0;
// ----------------------------------------

app.use("/", express.static(__dirname + "/layout/build"));
app.use((_req, res) => {
  res.sendFile(__dirname + "/layout/build/index.html");
});

function __clearTimeout() {
  if (timerState) clearTimeout(timer);
  else clearTimeout(main_timer);
}

function __openTimeout() {
  if (timerState) timer = setTimeout(processTimer, 500);
  else main_timer = setTimeout(processMainTimer, 500);
}

/**
 * @description
 * Lưu trữ file
 */
function save_excel_file() {
  console.log("Lưu thông tin vào file!");
}

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
      pauseTime,
    },
  });
}

/**
 *
 * @param {*} compul_dot - trạng thái bắt buộc có dấu chấm
 * @description
 * Thủ tục xử lí thời gian thành chuỗi rồi gửi
 */
function showTime(compul_dot = false) {
  let second = current_time % 60;
  if (0 <= second && second <= 9) second = "0" + String(second);
  let minute = (current_time - second) / 60;
  // if (0 <= minute && minute <= 9) minute = "0" + String(minute);
  io.sockets.emit("time", {
    minute,
    second,
    turnDot: compul_dot ? true : turnDot,
  });
}

/**
 * @description
 * Thủ tục xử lí thời gian phụ
 * Chạy thời gian nghỉ giữa hiệp
 */
function processTimer() {
  if (!turnDot) {
    current_time--;
  }
  if (current_time > 0) {
    showTime();
    turnDot = !turnDot;
    timer = setTimeout(processTimer, 500);
  } else {
    // Tinh chỉnh thời gian chuyển hiệp (round mới)
    current_time = memory_time;
    timerState = false;
    matches[current_match].round++;
    updateInforScreen();
    showTime(true);
    io.sockets.emit("in_match");
    main_timer = setTimeout(processMainTimer, 500);
  }
}

/**
 * @description
 * Thủ tục xử lí thời gian chính
 * Chạy biến chính (thời gian trận đấu)
 */
function processMainTimer() {
  if (!turnDot) {
    current_time--;
  }
  if (current_time > 0) {
    showTime();
    turnDot = !turnDot;
    main_timer = setTimeout(processMainTimer, 500);
  } else {
    // Thời gian nghỉ giữa hiệp
    current_time = preparation_time;
    timerState = true;
    // Phần chuẩn bị xử lí hiệp mới
    let match = matches[current_match];
    if (match.red_user.scores > match.blue_user.scores) {
      match.red_user.won++;
    } else if (match.red_user.scores < match.blue_user.scores) {
      match.blue_user.won++;
    }
    matches[current_match] = match;
    updateInforScreen();
    if (match.round == 3 && match.red_user.won != match.blue_user.won) {
      io.sockets.emit("time", { minute: 0, second: "00", turnDot: true });
      save_excel_file();
    } else {
      if (match.round == 4) {
        io.sockets.emit("time", { minute: 0, second: "00", turnDot: true });
        console.log("Kết thúc hiệp 4, hòa điểm!");
      } else {
        showTime(true);
        io.sockets.emit("out_match"); // Dùng để khóa một số phím chức năng
        timer = setTimeout(processTimer, 500);
      }
    }
  }
}

function onHandleCaringAndConsidering() {
  interuptState++;
  if (interuptState == 1) {
    __clearTimeout();
    showTime(true);
    pauseTime = true;
  }
  if (interuptState == 2) {
    interuptState = 0;
    __openTimeout();
    pauseTime = false;
  }
  updateInforScreen();
}

io.on("connection", (socket) => {
  console.log("Có kết nối từ người dùng!");

  // socket.emit("time", "2:00");
  socket.emit("time", { minute: 2, second: "00", turnDot: true });
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
    main_timer = setTimeout(processMainTimer, 500);
  });

  socket.on("end_round", () => {
    //console.log(timerState);
    __clearTimeout();
  });

  socket.on("update_score", (infor) => {
    let target_user = matches[current_match].red_user;
    if (infor.code == "B") target_user = matches[current_match].blue_user;

    if (infor.score == -1 && target_user.scores > 0) target_user.scores--;
    if (infor.score != -1) {
      target_user.scores++;
      target_user.hits++;

      if (matches[current_match].round == 4) {
        console.log("Xử lí trường hợp hiệp 4 có ghi nhận kết quả!");
        target_user.scores--;
        target_user.scores += round_4_score;
        /// Phần chuẩn bị xử lí hiệp mới
        // __clearTimeout();
      }
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

  socket.on("caring", () => onHandleCaringAndConsidering());
  socket.on("considering", () => onHandleCaringAndConsidering());

  socket.on("clear_score", () => {
    let match = matches[current_match];
    match.red_user = {
      ...match.red_user,
      hits: 0,
      gam_jeom: 0,
      won: 0,
      scores: 0,
    };
    match.blue_user = {
      ...match.blue_user,
      hits: 0,
      gam_jeom: 0,
      won: 0,
      scores: 0,
    };
    matches[current_match] = match;
    updateInforScreen();
  });
});

server.listen(PORT, () => {
  console.log(`Dịch vụ đã được khởi chạy tại cổng: ${PORT}`);
  console.log(
    `Kết nối thông qua địa chỉ http://localhost:${PORT} hoặc http://${ip.address()}:${PORT}`
  );
});
