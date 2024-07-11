import React, { useEffect, useState } from "react";
import HienThi from "./HienThi";
import { socket } from "./socket";
import {
  default_red_user,
  default_blue_user,
  default_match_infor,
  default_time,
} from "./components/cfg";

function ShowScreen() {
  const [time, setTime] = useState(default_time);
  const [redInfor, setRedInfor] = useState(default_red_user);
  const [blueInfor, setBlueInfor] = useState(default_blue_user);
  const [matchInfor, setMatchInfor] = useState(default_match_infor);

  const onSetTime = (_time) => {
    setTime(_time);
  };

  const onSetMatch = (infor) => {
    setRedInfor(infor.red_user);
    setBlueInfor(infor.blue_user);
    setMatchInfor(infor.match);
  };

  useEffect(() => {
    if (!socket.connected) socket.connect();
    socket.on("time", onSetTime);
    socket.on("match", onSetMatch);
    socket.on("content", onSetMatch);

    return () => {
      socket.off("time", onSetTime);
      socket.off("match", onSetMatch);
      socket.off("content", onSetMatch);
      socket.disconnect();
    };
  }, []);

  return (
    <HienThi
      blue_user={blueInfor}
      red_user={redInfor}
      {...matchInfor}
      time={time}
    />
  );
}

export default ShowScreen;
