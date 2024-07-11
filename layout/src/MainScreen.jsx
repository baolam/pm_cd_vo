import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import ShowScreen from "./ShowScreen";
import { socket } from "./socket";

function MainScreen() {
  const [disabledStart, setDisabledStart] = useState(false);
  const [disabledCaring, setDisabledCaring] = useState(true);
  const [disabledConsidering, setDisabledConsidering] = useState(true);
  const [disabledClearScore, setDisabledClearScore] = useState(false);
  const [stateCareAndCon, setStateCareAndCon] = useState(0);
  const [rName, setRName] = useState('');
  const [bName, setBName] = useState('');
  const [rScore, setRScore] = useState(0);
  const [bScore, setBScore] = useState(0);
  const [rGamJeom, setRGamJeom] = useState(0);
  const [bGamJeom, setBGamJeom] = useState(0);

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

  const outMatch = () => {
    setDisabledCaring(true);
    setDisabledConsidering(true);
  };

  const inMatch = () => {
    setDisabledCaring(false);
    setDisabledConsidering(false);
  };

  const onSetMatch = (infor) => {
    setRName(infor.red_user.name);
    setBName(infor.blue_user.name);
  };

  const onContent = (infor) => {
    setRScore(infor.red_user.scores);
    setRGamJeom(infor.red_user.gam_jeom);
    setBScore(infor.blue_user.scores);
    setBGamJeom(infor.blue_user.gam_jeom);
  }

  useEffect(() => {
    socket.on("out_match", outMatch);
    socket.on("in_match", inMatch);
    socket.on("match", onSetMatch);
    socket.on("content", onContent);

    return () => {
      socket.off("out_match", outMatch);
      socket.off("in_match", inMatch);
      socket.off("match", onSetMatch);
      socket.off("content", onContent);
    }
  }, []);

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
        rName={rName}
        rScore={rScore}
        rGamJeom={rGamJeom}
        bName={bName}
        bScore={bScore}
        bGamJeom={bGamJeom}
      />
    </>
  );
}

export default MainScreen;