import React, { useEffect } from "react";
import Dashboard from "./Dashboard";
import ShowScreen from "./ShowScreen";
import { socket } from "./socket";

function MainScreen() {
  const onStart = () => {
    console.log("Bắt đầu");
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

  const onChangeJamJeom = (user, error) => {

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
        onChangeJamJeom={onChangeJamJeom}
      />
    </>
  );
}

export default MainScreen;