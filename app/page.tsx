"use client";

import Nav_ from "./components/navigation/Nav_";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { getLocations } from "@/firebase";
import { CacheState, MenuState, OpenState } from "./components/atoms/atoms";
import RenderMap_ from "./components/map/RenderMap_";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/navigation";
import Tray_, { Autocomplete_ } from "./components/ui/Tray_";
import { Autocomplete } from "@react-google-maps/api";
import Home_ from "./components/ui/Home_";

export default function Home() {
  const [menu_, setMenu_] = useRecoilState(MenuState);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full h-screen flex flex-col justify-center items-center absolute top-0 z-[0]">
        <RenderMap_ />
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
}
