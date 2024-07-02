import React from "react";
import HienThi from "./HienThi";

export default function ShowScreen() {
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
    </>
  );
}
