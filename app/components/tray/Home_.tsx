import { useEffect, useState } from "react";
import { setTimeout } from "timers";
import { MenuState } from "../atoms/atoms";
import { useRecoilState } from "recoil";

const features_ = [
  "/assets/images/redseat.jpg",
  "https://images.pexels.com/photos/1457844/pexels-photo-1457844.jpeg?cs=srgb&dl=pexels-jean-van-der-meulen-1457844.jpg&fm=jpg&w=1280&h=1920&_gl=1*k5nq1j*_ga*MTA4MjQyNDIzMS4xNjgyMzcyOTc2*_ga_8JE65Q40S6*MTcwMzQwMjAxNy44Ny4xLjE3MDM0MDIxNDQuMC4wLjA.",
  "https://images.pexels.com/photos/7709602/pexels-photo-7709602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

interface Home_Props {}

const Home_ = ({}: Home_Props) => {
  const [feature_, setFeature_] = useState(features_[0]);
  const [index_, setIndex_] = useState(0);
  const [slidePause_, setSlidePause_] = useState(false);
  const [menu_, setMenu_] = useRecoilState(MenuState);

  useEffect(() => {
    let intervalId: any;

    if (!slidePause_) {
      // Start the interval if slidePause_ is false
      intervalId = setInterval(() => {
        // Increment the index every 5 seconds
        setIndex_((prevIndex) => (prevIndex + 1) % features_.length);
      }, 5000);
    }

    // Clear the interval on component unmount to avoid memory leaks
    return () => clearInterval(intervalId);

    // Add slidePause_ to the dependency array if you want to react to changes in slidePause_
  }, [slidePause_, features_.length]); // features_.length added to ensure that useEffect reacts to changes in the features_ array length

  return (
    <div
      className={`m-auto flex flex-col items-center justify-start h-screen min-w-2 overflow-hidden overflow-y-scroll pb-[50px] absolute top-0 right-1 ${
        menu_ == ""
          ? "mr-[0px] duration-200 opacity-100 pointer-events-auto"
          : "mr-[-15px] duration-0 opacity-0 pointer-events-none"
      } transition-all`}
    >
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
                    index_ == index
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
              <p className={`font-black text-[25px] text-orange-500`}>
                .W
                <span className={`font-black text-[15px] text-white`}>
                  HOSE
                </span>
                <span className={`font-normal text-[15px] text-white`}>
                  INN
                </span>
              </p>
            </div>
          </div>
          <p
            className={`text-[14px] text-black font-semibold px-1 rounded mt-4 mb-1 mr-auto`}
          >
            Featured
            <span className={`font-normal text-black/80`}>Locations</span>
          </p>
          <div className={`grid grid-cols-3 gap-[1px] w-full min-h-2`}>
            {features_.map((obj, index) => {
              return (
                <div
                  key={index}
                  className={`w-full h-[165px] bg-white rounded flex flex-col justify-center items-center hover:bg-white/80 transition-all duration-200 overflow-hidden relative`}
                  onClick={() => {
                    setIndex_(index);
                  }}
                  onMouseEnter={() => {
                    index_ == index && setSlidePause_(true);
                  }}
                  onMouseLeave={() => {
                    index_ == index && setSlidePause_(false);
                  }}
                >
                  <img
                    src={obj}
                    className={`object-cover w-full h-full absolute top-0 transition-all duration-500 ${
                      index_ == index
                        ? "opacity-100"
                        : "opacity-30 hover:opacity-70 hover:scale-[105%] cursor-pointer"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home_;
