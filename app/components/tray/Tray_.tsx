'use client'

import { useRecoilState } from "recoil";
import {
  CacheState, MarkerState, MarkerState2
} from "../atoms/atoms";
import { getClosestLocation, getLocations } from "@/firebase";
import { useEffect } from "react";
import Home_ from "./Home_";
import Create_ from "./Create_";
import Messages_ from "./Messages_";
import Invites_ from "./Invites_";

interface Tray_Props {}

const Tray_ = ({}: Tray_Props) => {
  const [cache_, setCache_] = useRecoilState(CacheState);
  const [marker_, setMarker_] = useRecoilState(MarkerState2);
  useEffect(() => {
    const y_ = async () => {
      const x__ = await getClosestLocation({
        lat: marker_.coordinates[0],
        lng: marker_.coordinates[1],
      });
      // @ts-ignore
      setCache_([x__]);
    };
    y_().then(() => {});
  }, [marker_]);

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