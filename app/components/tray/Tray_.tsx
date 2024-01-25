"use client";

import { useRecoilState } from "recoil";
import { CacheDataState, CacheState, MarkerState, MarkerState2 } from "../atoms/atoms";
import { getLocations, getLocationsByDistance } from "@/firebase";
import { useEffect, useState } from "react";
import Home_ from "./Home_";
import Create_ from "./Create_";
import Messages_ from "./Messages_";
import Invites_ from "./Invites_";

interface Tray_Props {}

const Tray_ = ({}: Tray_Props) => {
  const [cache_, setCache_] = useRecoilState(CacheState);
  const [cacheData_, setCacheData_] = useRecoilState(CacheDataState);
  const [marker_, setMarker_] = useRecoilState(MarkerState2);

  const runSet = (data_:any) => {
    setCacheData_(data_);
    // console.log(data_)
  };

  useEffect(() => {
    const y_ = async () => {
      const x__ = await getLocations();
      // @ts-ignore
      return x__;
      // @ts-ignore
    };
    y_().then((result) => {
      runSet(result);
      // @ts-ignore
      return setCache_(result)
    });
  }, []);

  useEffect(() => {
    if(cacheData_){
      const y_ = async () => {
        const x__ = await getLocationsByDistance({
          lat: marker_.coordinates[0],
          lng: marker_.coordinates[1],
          data: cacheData_
        });
        // @ts-ignore
        setCache_(x__);
        // console.log(x__);
      };
      y_().then(() => {});
    }
    // console.log(cacheData_)
  }, [marker_]);

  return (
    <div className={``}>
      <Home_ />
      <Invites_ />
      <Messages_ />
      <Create_ />
    </div>
  );
};

export default Tray_;
