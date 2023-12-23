import { useRecoilState } from "recoil";
import {
  FocusState,
  FocusImageState,
  OpenState,
  ThisState,
} from "../atoms/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faLocation, faPhone, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

interface Catalogue_Props {}

const Catalogue_ = ({}: Catalogue_Props) => {
  const [focus_, setFocus_] = useRecoilState(FocusState);
  const [focusImage_, setFocusImage_] = useRecoilState(FocusImageState);
  const [open_, setOpen_] = useRecoilState(OpenState);
  const [showThis_, setShowThis_] = useRecoilState(ThisState);
  return (
    <div
      className={`w-full min-h-screen fixed ${
        open_ ? "top-0" : "top-[-100%]"
      } left-0 flex flex-col justify-center items-center bg-white/80 backdrop-blur-md transition-all duration-200 overflow-scroll`}
    >
      <div
        className={`w-[1300px] min-h-1 m-auto md:grid grid-cols-1 md:grid-cols-4 gap-1
        `}
      >
        {/* @ts-ignore */}
        {focus_?.images?.map((obj, index) => {
          if(index == 0){
            return;
          }
          return (
            <div
              className={`w-full cursor-pointer flex min-w-0 h-[322px] flex-col rounded-[4px] relative overflow-hidden opacity-70 hover:opacity-100 transition-all duration-500 hover:duration-75`}
              onClick={() => {
                // setOpen_(false)
              }}
              key={index}
            >
              <img
                src={obj.url}
                className={`w-full h-full object-cover`}
              />
            </div>
          );
        })}
        <div
          className={`min-w-2 h-full mt-2 flex-col justify-end items-end ml-4`}
        >
          <p className={`text-[14px] font-medium`}>
            Address:
            <span className={`text-black/60 text-[13px]`}>
              {" "}
              Address goes here..
            </span>
          </p>
          <p className={`text-[14px] font-medium`}>
            Deposit:
            <span className={`text-black/60 text-[13px]`}> Price goes here..</span>
          </p>
          <p className={`text-[14px] font-medium`}>
            Rental:
            <span className={`text-black/60 text-[13px]`}> Price goes here..</span>
          </p>
          <div
            className={`w-full h-[60px] flex flex-row justify-start items-center mt-2`}
          >
            {[faPhone, faCar].map((obj_, index) => {
              return <div
              className={`w-[60px] h-[60px] flex flex-row justify-center items-center bg-black/40 hover:bg-black/80 cursor-pointer  text-white rounded-[3px] mx-[1px]`}
              key={index}
              onClick={() => {
                const goToGoogleMaps = (latitude, longitude) => {
                  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
                  window.open(googleMapsUrl, '_blank');
                };

                goToGoogleMaps(focus_.postAddress?.lat, focus_.postAddress?.lng)
              }}
            >
              <FontAwesomeIcon icon={obj_} className={``} />
            </div>
            })}
          </div>
        </div>
        {/* <div
          className={`w-full h-full bg-transparent flex flex-row justify-center items-center`}
        >
          <FontAwesomeIcon
            icon={faPlus}
            className={`w-[25px] h-[25px] hover:w-[22px] hover:h-[22px] m-1 hover:text-black/80 text-black/50 hover:cursor-pointer transition-all duration-200`}
          />
        </div>
        <div className={`min-w-2 h-full mt-2 flex-col justify-center items-start`}>
          <p className={`text-[14px] font-medium`}>
            Address:
            <span className={`text-black/60 text-[13px]`}>
              {" "}
              30 Pierre Olleman Street, Brandwag, Bloemfontein
            </span>
          </p>
          <p className={`text-[14px] font-medium`}>
            Rental:
            <span className={`text-black/60 text-[13px]`}>
              {" "}
              R3900
            </span>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Catalogue_;
