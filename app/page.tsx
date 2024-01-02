"use client";

import React, { useEffect } from "react";
import RenderMap_ from "./components/map/RenderMap_";
import Tray_ from "./components/tray/Tray_";
import { RollingState, UserState } from "./components/atoms/atoms";
import { useRecoilState } from "recoil";
import { v4 } from "uuid";
import { createLocationData_ } from "@/firebase";

const Home = () => {
  const [user_, setUser_] = useRecoilState(UserState);
  const [rolling_, setRolling_] = useRecoilState(RollingState);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full h-screen flex flex-col justify-center items-center absolute top-0 z-[0]">
        {user_ && <RenderMap_ />}
      </div>
      <div
        className={`w-[490px] h-screen flex flex-col justify-center items-center absolute top-0 left-0 bg-white/70 backdrop-blur-[10px] pointer-events-none`}
      >
        <div className={`w-full h-full relative z-1`}>
          <Tray_ />
        </div>
      </div>
    </main>
  );
};

export default Home;
