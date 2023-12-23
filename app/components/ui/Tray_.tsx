'use client'

import { useRecoilState } from "recoil";
import {
  CacheState,
  LoadingState,
  FocusState,
  MenuState,
  OpenState,
  UserState,
  DepthState,
  LocationState,
  MarkerState,
  RoomState,
  PriceState,
  DescState,
  TempState,
  ContentState,
} from "../atoms/atoms";
import { createLocation_, getLocations } from "@/firebase";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faAngleRight,
  faDollarSign,
  faHouse,
  faImage,
  faLocation,
  faSpinner,
  faStar,
  faStarHalf,
} from "@fortawesome/free-solid-svg-icons";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Timestamp } from "firebase/firestore";
import Home_ from "./Home_";
import Input_, { Autocomplete_ } from "../tray/AutoComplete_";
import BlackBubble_ from "./Bubble_";
import BrandButton_ from "./BrandButton_";
import Create_ from "../tray/Create_";

interface Tray_Props {}

const Tray_ = ({}: Tray_Props) => {
  const [markerData, setMarkerData] = useRecoilState(MarkerState);
  const [menu_, setMenu_] = useRecoilState(MenuState);
  const [deep_, setDeep_] = useRecoilState(DepthState);
  const [cache_, setCache_] = useRecoilState(CacheState);
  const [open_, setOpen_] = useRecoilState(OpenState);
  const [focus_, setFocus_] = useRecoilState(FocusState);
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
      <div
        className={`m-auto flex flex-col items-center justify-start h-screen min-w-2 overflow-hidden overflow-y-scroll pb-[50px] absolute top-0 right-1 ${
          menu_ == ""
            ? "mr-[0px] duration-200 opacity-100 pointer-events-auto"
            : "mr-[-15px] duration-0 opacity-0 pointer-events-none"
        } transition-all`}
      >
        <Home_ />
      </div>
      <div
        className={`m-auto flex flex-col items-center justify-start h-screen min-w-2 px-6 overflow-hidden overflow-y-scroll pb-[50px] absolute top-0 right-1 ${
          menu_ == "Providers"
            ? "mr-[0px] duration-200 opacity-100 pointer-events-auto"
            : "mr-[-15px] duration-0 opacity-0 pointer-events-none"
        } transition-all`}
      >
        {[...cache_].map((obj, index) => {
          return (
            <div
              key={index}
              className={`w-[332px] min-h-[165px] bg-black/40 rounded flex flex-col justify-center items-center cursor-pointer hover:bg-black/80 transition-all hover:duration-75 duration-1000 my-1 overflow-hidden relative shadow-md hover:opacity-90 ${
                focus_ == obj ? "opacity-90" : "opacity-70"
              }`}
              onClick={() => {
                if (focus_ == obj) {
                  setOpen_(true);
                } else {
                  setFocus_(obj);
                  setMarkerData({
                    coordinates: [obj.postAddress?.lat, obj.postAddress.lng],
                    title: "Next",
                  });
                }
              }}
            >
              <img
                src={`${obj.images[0].url}`}
                className={`object-cover w-full h-full`}
              />
              <div
                className={`text-[12px] text-black/70 bg-white/80 px-1 rounded m-1 flex flex-row py-[1.5px] opacity-100 absolute bottom-6 right-0`}
              >
                From{" "}
                <span className={`font-medium ml-1 text-black mr-[0.5px]`}>
                  R{obj.deposit}
                </span>
              </div>
              <div
                className={`text-[12px] text-black/80 italic bg-white/80 px-1 rounded ml-auto m-1  absolute bottom-0 right-0`}
              >
                {obj.postDesc}
              </div>
            </div>
          );
        })}
        <div
          className={`mt-6 w-full py-4 flex-row flex justify-center items-center opacity-50 hover:opacity-90 transition-all duration-200 cursor-pointer`}
          onClick={() => {
            setMenu_("Create");
            setDeep_({ logic: true, data: menu_ });
          }}
        >
          <FontAwesomeIcon icon={faAdd} />{" "}
          <p className={`_inter text-[13px] ml-2`}>New Entry</p>
        </div>
      </div>
      <div
        className={`m-auto flex flex-col items-center justify-start h-screen min-w-2 px-6 overflow-hidden overflow-y-scroll pb-[50px] absolute top-0 right-1 ${
          menu_ == "Messages"
            ? "mr-[0px] duration-200 opacity-100 pointer-events-auto"
            : "mr-[-15px] duration-0 opacity-0 pointer-events-none"
        } transition-all`}
      >
        {[...cache_].map((obj, index) => {
          return (
            <div
              key={index}
              className={`w-[332px] min-h-[100px] bg-black/40 rounded flex flex-col justify-center items-center cursor-pointer hover:bg-black/80 transition-all duration-200 my-1`}
              onClick={() => {
                setMenu_("Inbox");
                setDeep_({ logic: true, data: menu_ });
              }}
            >
              <div
                className={`text-[12px] text-black/70 bg-white/80 px-1 rounded mt-auto mr-auto m-1 mb-0 flex flex-row justify-center items-center py-[1.5px] invert`}
              >
                Morning, I see you requested a visit..
              </div>
              <div
                className={`text-[12px] text-black/70 bg-white/80 px-1 rounded mr-auto m-1 mb-2 flex flex-row justify-center items-center py-[1.5px] invert`}
              >
                <FontAwesomeIcon icon={faLocation} className={`mr-1`} />{" "}
                Location
              </div>
              <div
                className={`text-[12px] text-black/80 italic bg-white/80 px-1 rounded ml-auto m-1`}
              >
                Is it the house on Craftsman Street?
              </div>
            </div>
          );
          //   return <Setup_ index_={index} key={index} obj_={obj} />;
        })}
      </div>
      <div
        className={`m-auto flex flex-col items-start justify-start min-h-screen min-w-2 px-6 overflow-hidden overflow-y-scroll pb-auto absolute top-0 right-1 ${
          menu_ === "Invites"
            ? "mr-[0px] duration-200 opacity-100 pointer-events-auto"
            : "mr-[-15px] duration-0 opacity-0 pointer-events-none"
        } grid grid-cols-2 gap-1 self-end transition-all justify-between content-start p-4 pt-1 h-412 w-452 overscroll-auto`}
      >
        {[...cache_].map((obj, index) => {
          return (
            <div
              key={index}
              className={`w-[165px] h-[165px] bg-black/40 rounded flex flex-col justify-center items-center cursor-pointer hover:bg-black/80 transition-all duration-200`}
              onClick={() => {
                setFocus_(obj);
                setOpen_(true);
              }}
            >
              <div
                className={`text-[12px] text-black/80 bg-white/80 px-1 rounded mt-auto ml-auto m-1`}
              >
                1 Jan, 2024
              </div>
            </div>
          );
        })}
      </div>
      <div
        className={`m-auto flex flex-col items-center justify-start h-screen min-w-2 max-w-[380px] px-6 overflow-hidden overflow-y-scroll pb-[50px] absolute top-0 right-1 ${
          menu_ == "Inbox"
            ? "mr-[0px] duration-200 opacity-100 pointer-events-auto"
            : "mr-[-15px] duration-0 opacity-0 pointer-events-none"
        } transition-all`}
      >
        <div
          className={`text-[12px] text-black/70 bg-white/80 px-1 rounded m-1 mb-0 flex flex-row justify-center items-center py-[1.5px] invert w-full h-[150px] cursor-pointer`}
        ></div>
        <div
          className={`px-1 rounded m-1 mb-0 flex flex-col justify-center items-start py-[1.5px] w-full h-[50px] mt-4`}
        >
          <p className={`text-[17px] font-semibold text-black _oswald`}>
            Address Goes Here
          </p>
          <div
            className={`text-[13px] font-semibold text-orange-600 flex flex-row items-center mb-4`}
          >
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStarHalf} />
            <p className={`text-[13px] font-normal italic text-black _federo`}>
              4.5/5 Stars
            </p>
          </div>
        </div>
        <div
          className={`w-[332px] min-h-[100px] rounded flex flex-col justify-center items-center transition-all duration-200 my-1`}
          onClick={() => {}}
        >
          <div
            className={`text-[12px] text-black/70 bg-white/80 px-1 rounded mt-auto mr-auto m-1 mb-0 flex flex-row justify-center items-center py-[1.5px] invert`}
          >
            Morning, I see you requested a visit..
          </div>
          <div
            className={`text-[12px] text-black/70 bg-white/80 px-1 rounded mr-auto m-1 mb-2 flex flex-row justify-center items-center py-[1.5px] invert`}
          >
            <FontAwesomeIcon icon={faLocation} className={`mr-1`} /> Location
          </div>
          <div
            className={`text-[12px] text-black/80 italic bg-white/80 px-1 rounded ml-auto m-1`}
          >
            Is it the house on Craftsman Street?
          </div>
          <div
            className={`text-[12px] text-black/80 italic rounded-[3px] flex flex-row justify-center ml-auto m-1 min-w-8 p-2 px-3`}
          >
            <div
              className={`w-[20px] h-full flex flex-col justify-center items-end cursor-pointer hover:pr-[8px] pr-1 transition-all duration-200`}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </div>
            <input type="text" placeholder="Start typing here.." />
          </div>
        </div>
      </div>
      <Create_/>
      
    </div>
  );
};

export default Tray_;
