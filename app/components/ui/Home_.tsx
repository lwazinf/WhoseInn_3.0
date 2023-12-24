import { useEffect, useState } from "react";
import { setTimeout } from "timers";

const features_ = [
  "/assets/images/redseat.jpg",
  "https://images.pexels.com/photos/1457844/pexels-photo-1457844.jpeg?cs=srgb&dl=pexels-jean-van-der-meulen-1457844.jpg&fm=jpg&w=1280&h=1920&_gl=1*k5nq1j*_ga*MTA4MjQyNDIzMS4xNjgyMzcyOTc2*_ga_8JE65Q40S6*MTcwMzQwMjAxNy44Ny4xLjE3MDM0MDIxNDQuMC4wLjA.",
  "https://images.pexels.com/photos/7709602/pexels-photo-7709602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

interface Home_Props {}

const Home_ = ({}: Home_Props) => {
  const [feature_, setFeature_] = useState(features_[0]);

  return (
    <div
      className={`w-[360px] ml-auto h-full flex flex-col justify-center items-center`}
    >
      <div
        className={`m-auto flex flex-col items-center justify-start h-screen w-full overflow-hidden overflow-y-scroll pb-[50px] duration-200 transition-all pr-1`}
      >
        <div
          className={`w-full h-[550px] rounded-[4px] flex flex-col justify-center items-center mt-1 mb-0 bg-black/80 overflow-hidden relative cursor-pointer`}
        >
          {features_.map((obj, index) => {
            return (
              <img
                key={index}
                src={features_[index]}
                className={`object-cover w-full h-full absolute top-0 transition-all duration-200 ${
                  feature_ == features_[index]
                    ? "scale-100 opacity-100"
                    : "scale-[105%] opacity-0"
                }`}
              />
            );
          })}
          {/* <div
            className={`w-full h-full absolute flex flex-col justify-center items-start p-[1.5px]`}
          >
            <div
              className={`w-full h-full flex flex-col justify-end items-end rounded-[3px] bg-black/50 backdrop-blur-lg mt-auto p-2 py-1 text-black/80 hover:opacity-0 opacity-100`}
            ></div>
          </div> */}
          <div
            className={`w-full h-full absolute top-0 flex flex-col justify-end items-end pr-2 opacity-80`}
          >
            <p className={`font-black text-[30px] text-orange-500`}>
              .W
              <span className={`font-black text-[20px] text-white`}>HOSE</span>
              <span className={`font-normal text-[20px] text-white`}>INN</span>
            </p>
          </div>
        </div>
        <p
          className={`text-[14px] text-black font-semibold px-1 rounded mt-4 mb-1 mr-auto`}
        >
          Featured<span className={`font-normal text-black/80`}>Locations</span>
        </p>
        <div className={`grid grid-cols-3 gap-[1px] w-full min-h-2`}>
          {features_.map((obj, index) => {
            return (
              <div
                key={index}
                className={`w-full h-[165px] bg-black rounded flex flex-col justify-center items-center cursor-pointer hover:bg-black/80 transition-all duration-200 overflow-hidden relative`}
                onClick={() => {
                  setFeature_(obj);
                }}
              >
                <img
                  src={obj}
                  className={`object-cover w-full h-full absolute top-0 ${
                    feature_ == features_[index] ? "opacity-100" : "opacity-30"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home_;
