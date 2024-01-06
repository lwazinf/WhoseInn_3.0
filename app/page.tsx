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
      <Notif_ />
    </main>
  );
};

export default Home;

interface Notif_Props {}

const Notif_ = ({}: Notif_Props) => {
  return (
    <div
      className={`absolute top-0 hover:right-[-15px] right-[-205px] scale-75 hover:scale-90 hover:animate-none bg-white/70 backdrop-blur-lg rounded-[3px] shadow-md w-[250px] h-[400px] m-2 flex flex-col justify-center items-center overflow-hidden p-[1.7px] transition-all duration-[300ms] hover:duration-75 opacity-50 hover:opacity-100`}
    >
      <div
        className={`w-full h-full bg-black/30 flex flex-col justify-center items-center rounded-[4px] overflow-hidden relative cursor-pointer`}
        onClick={() => {
          console.log(`hello world`)
        }}
      >
        <img
          src={"https://images.pexels.com/photos/19195859/pexels-photo-19195859/free-photo-of-a-crowded-vinyl-record-shop.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
          className={`object-cover w-full h-full absolute top-0 transition-all duration-200`}
        />
      </div>
    </div>
  );
};
