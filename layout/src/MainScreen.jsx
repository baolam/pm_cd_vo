import React, { useEffect } from "react";
import Dashboard from "./Dashboard";
import ShowScreen from "./ShowScreen";
import { socket } from "./socket";

function MainScreen() {
  const onStart = (advance_input) => {
    console.log("Bắt đầu trận đấu");
    socket.emit("start_round", advance_input);
  };

  const onEnd = () => {
    console.log("Kết thúc");
  };

  const onStopForCaring = () => {
    console.log("Dừng săn sóc");
  };

  const onStopForConsidering = () => {
    console.log("Dừng xem xét");
  };

  const onRestart = () => {
    console.log("Bắt đầu lại");
  };

  const onClearScore = () => {
    console.log("Xóa điểm");
  };

  const onChangeScore = (user, point) => {

  };

  const onChangeGamJeom = (user, error) => {

  }

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