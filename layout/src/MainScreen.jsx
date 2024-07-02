import React from "react";
import HienThi from "./HienThi";
import Dashboard from "./Dashboard";

export default function MainScreen() {
  return (
    <>
      <HienThi
        red_user={{
          name: "H1",
          gam_jeom: 0,
          hits: 1,
          won: 1,
        }}
        blue_user={{
          name: "H2",
          gam_jeom: 0,
          hits: 1,
          won: 1,
        }}
        match={100}
        round={1}
        time="2:00"
      />
      <Dashboard />
    </>
  );
}
