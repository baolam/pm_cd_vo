import React, { useState } from "react";
import Dashboard from "./Dashboard";
import ShowScreen from "./ShowScreen";
import { socket } from "./socket";

function MainScreen() {
  const [disabledStart, setDisabledStart] = useState(false);
  const [disabledCaring, setDisabledCaring] = useState(true);
  const [disabledConsidering, setDisabledConsidering] = useState(true);
  const [disabledClearScore, setDisabledClearScore] = useState(false);
  const [stateCareAndCon, setStateCareAndCon] = useState(0);

  const onStart = (advanced_input) => {
    // console.log("Bắt đầu trận đấu");
    socket.emit("start_round", advanced_input);
    setDisabledCaring(false);
    setDisabledConsidering(false);
    setDisabledClearScore(true);
  };

  const onEnd = () => {
    // console.log("Kết thúc");
    socket.emit("end_round");
    setDisabledStart(false);
    setDisabledClearScore(false);
    setDisabledCaring(true);
    setDisabledConsidering(true);
  };

  const onStopForCaring = () => {
    // console.log("Dừng săn sóc");
    socket.emit("caring");
    setStateCareAndCon(stateCareAndCon + 1);
    if (stateCareAndCon === 0) {
      setDisabledStart(true);
      setDisabledConsidering(true);
    }
    if (stateCareAndCon === 1) {
      setDisabledStart(false);
      setDisabledConsidering(false);
      setStateCareAndCon(0);
    }
  };

  const onStopForConsidering = () => {
    // console.log("Dừng xem xét");
    socket.emit("considering");
    setStateCareAndCon(stateCareAndCon + 1);
    if (stateCareAndCon === 0) {
      setDisabledStart(true);
      setDisabledCaring(true);
    }
    if (stateCareAndCon === 1) {
      setDisabledStart(false);
      setDisabledCaring(false);
      setStateCareAndCon(0);
    }
  };

  const onRestart = (advanced_input) => {
    // console.log("Bắt đầu lại");
    socket.emit("restart_round", advanced_input);
    setDisabledStart(true);
    setDisabledConsidering(true);
    setDisabledCaring(true);
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
        disabled={{
          start : disabledStart,
          caring : disabledCaring,
          considering : disabledConsidering,
          clear_score : disabledClearScore
        }}
      />
    </>
  );
}

export default MainScreen;