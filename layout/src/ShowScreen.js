import React, { useEffect, useState } from "react";
import HienThi from "./HienThi";
import { socket } from "./socket";

const default_infor = {
  red_user: {
    name: "H1",
    gam_jeom: 0,
    hits: 1,
    won: 1,
    team: "CLB",
  },
  blue_user: {
    name: "H2",
    gam_jeom: 0,
    hits: 1,
    won: 1,
    team: "CLB",
  },
  match: 100,
  round: 1,
  time: "2:00",
  pauseTime: false,
};

export default function ShowScreen() {
  const [time, setTime] = useState("2:00");
  const onSetTime = (_time) => {
    setTime(_time);
  };

  useEffect(() => {
    socket.connect();

    socket.on("time", onSetTime);

    return () => {
      socket.off("time", onSetTime);
    };
  }, []);
  return <HienThi {...default_infor} time={time} />;
}
