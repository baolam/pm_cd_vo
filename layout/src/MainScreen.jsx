import React from "react";
import Dashboard from "./Dashboard";
import ShowScreen from "./ShowScreen";

export default function MainScreen() {
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

  return (
    <>
      <ShowScreen />
      <Dashboard 
        onStart={onStart} 
        onEnd={onEnd} 
        onStopForCaring={onStopForCaring} 
        onStopForConsidering={onStopForConsidering}
        onRestart={onRestart}
      />
    </>
  );
}
