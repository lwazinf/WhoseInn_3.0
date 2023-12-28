'use client'

import { useRecoilState } from "recoil";
import {
  CacheState,
} from "../atoms/atoms";
import { getLocations } from "@/firebase";
import { useEffect } from "react";
import Home_ from "./Home_";
import Create_ from "./Create_";
import Messages_ from "./Messages_";
import Invites_ from "./Invites_";

interface Tray_Props {}

const Tray_ = ({}: Tray_Props) => {
  const [cache_, setCache_] = useRecoilState(CacheState);
  useEffect(() => {
    const y_ = async () => {
      const x_ = await getLocations();
      // @ts-ignore
      setCache_(x_);
    };
    y_().then(() => {});
  }, []);

  return (
    <div className={``}>
      <Home_/>
      <Invites_/>
      <Messages_/>
      <Create_/>
    </div>
  );
};

export default Tray_;
