import React from "react";
import Dashboard from "./Dashboard";
import ShowScreen from "./ShowScreen";
import { socket } from "./socket";

function MainScreen() {
  const onStart = (advanced_input) => {
    // console.log("Bắt đầu trận đấu");
    socket.emit("start_round", advanced_input);
  };

  const onEnd = () => {
    // console.log("Kết thúc");
    socket.emit("end_round");
  };

  const onStopForCaring = () => {
    // console.log("Dừng săn sóc");
    socket.emit("caring");
  };

  const onStopForConsidering = () => {
    // console.log("Dừng xem xét");
    socket.emit("considering");
  };

  const onRestart = (advanced_input) => {
    // console.log("Bắt đầu lại");
    socket.emit("restart_round", advanced_input);
  };

  const onClearScore = () => {
    // console.log("Xóa điểm");
    socket.emit("clear_score");
  };

  const onChangeScore = (code, score) => {
    socket.emit("update_score", {
      code,
      score 
    })
  };

  const onChangeGamJeom = (code, error) => {
    socket.emit("update_gam_jeom", {
      code, error
    });
  };

  return (
    <>
      <ShowScreen />
      <Dashboard 
        onStart={onStart} 
        onEnd={onEnd} 
        onStopForCaring={onStopForCaring} 
        onStopForConsidering={onStopForConsidering}
        onRestart={onRestart}
        onClearScore={onClearScore}
        onChangeScore={onChangeScore}
        onChangeGamJeom={onChangeGamJeom}
      />
    </>
  );
}

export default MainScreen;