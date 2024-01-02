import {
  faAdd,
  faDollarSign,
  faGenderless,
  faHouse,
  faImage,
  faLocation,
  faMarsAndVenus,
  faStar,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import BlackBubble_ from "./Bubble_";
import Input_, { Autocomplete_ } from "./AutoComplete_";
import BrandButton_ from "./BrandButton_";
import { useRecoilState } from "recoil";
import {
  CacheState,
  ContentState,
  DepthState,
  FocusState,
  LocationState,
  MarkerState,
  MenuState,
  OpenState,
  TempState,
} from "../atoms/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Create_Props {}

const Create_ = ({}: Create_Props) => {
  const [tempURLs_, setTempURLs_] = useRecoilState(TempState);
  const [location_, setLocation_] = useRecoilState(LocationState);
  const [content_, setContent_] = useRecoilState(ContentState);
  const [menu_, setMenu_] = useRecoilState(MenuState);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files_ = event.target.files;

    // Check if demo3 property is null
    if (content_.demo3 === null) {
      // Convert the file to a Blob
      // @ts-ignore
      const blob = new Blob([files_[0]]);

      // Create an object URL from the Blob
      const objectURL = URL.createObjectURL(blob);
      setTempURLs_((prevURLs) => ({
        ...prevURLs,
        // @ts-ignore
        [event.target.id]: { url: objectURL, file: files_[0] },
      }));

      return;
    }
  };

  const handleFileInputClick = (id: any) => {
    document?.getElementById(id)?.click();
  };
  return (
    <div className={``}>
      <Parent_ />
      <div
        className={`h-screen m-auto flex flex-col items-center justify-start min-w-2 max-w-[380px] px-6 overflow-hidden overflow-y-scroll pb-[50px] absolute top-0 right-1 ${
          menu_ == "Create"
            ? "mr-[0px] duration-200 opacity-100 pointer-events-auto"
            : "mr-[-15px] duration-0 opacity-0 pointer-events-none"
        } transition-all`}
      >
        <div
          className={`w-[332px] rounded flex flex-col justify-center items-center transition-all duration-200 my-1`}
          onClick={() => {}}
        >
          <div className={``}>
            <div
              className={`text-[12px] text-black/70 bg-black/50 hover:bg-black/70 rounded m-1 mb-0 flex flex-row justify-center items-center w-[332px] h-[150px] cursor-pointer transition-all hover:duration-75 duration-1000 overflow-hidden`}
              onClick={() => {
                handleFileInputClick("cover");
              }}
            >
              <img
                src={tempURLs_.cover.url != null ? tempURLs_.cover.url : ``}
                className={`w-full h-full object-cover ${
                  tempURLs_.cover.url == null ? "opacity-0" : "opacity-100"
                } ${tempURLs_.cover.url == null ? "opacity-0" : "opacity-100"}`}
              />
            </div>
            <div
              className={`px-1 rounded m-1 mb-0 flex flex-col justify-center items-start py-[1.5px] w-full h-[50px] mt-1`}
            >
              <p className={`text-[17px] font-semibold text-black _oswald`}>
                {location_.address
                  ? location_.address
                  : "Your Address Goes Here .. !!"}
              </p>
            </div>
          </div>
          <div
            className={`text-[12px] text-black/70 bg-white/80 px-2 rounded-[3px] mr-auto m-1 mb-[1px] flex flex-row justify-center items-center py-[1.5px] pb-4 invert max-w-[70%]`}
          >
            <FontAwesomeIcon
              icon={faImage}
              className={`mr-1 my-[2px] mb-auto`}
            />{" "}
            Clicking the box above, select a cover for your property..
          </div>
          <div
            className={`text-[12px] text-black/70 bg-white/80 px-2 rounded-[3px] mr-auto m-1 mb-1 flex flex-row justify-center items-center py-[1.5px] pb-4 invert max-w-[70%]`}
          >
            <FontAwesomeIcon
              icon={faStar}
              className={`mr-1 my-[2px] mb-auto`}
            />{" "}
            Select three (3) images that best showcase your property..
          </div>
          <div
            className={`flex flex-col justify-center items-center w-full min-h-2 px-1`}
          >
            <div
              className={`flex flex-row justify-center items-center w-full min-h-2`}
            >
              <div
                className={`w-full h-[160px] bg-black/50 rounded-[3px] mx-[1px] mr-[1.5px] cursor-pointer hover:bg-black/80 transition-all hover:duration-75 duration-1000 overflow-hidden`}
                onClick={() => {
                  handleFileInputClick("demo1");
                }}
              >
                <img
                  src={tempURLs_.demo1.url != null ? tempURLs_.demo1.url : ``}
                  className={`w-full h-full object-cover ${
                    tempURLs_.demo1.url == null ? "opacity-0" : "opacity-100"
                  } ${
                    tempURLs_.demo1.url == null ? "opacity-0" : "opacity-100"
                  }`}
                />
              </div>
              <div
                className={`w-full h-[160px] bg-black/50 rounded-[3px] mx-[1px] ml-[1.5px] cursor-pointer hover:bg-black/80 transition-all hover:duration-75 duration-1000 overflow-hidden`}
                onClick={() => {
                  handleFileInputClick("demo2");
                }}
              >
                <img
                  src={tempURLs_.demo2.url != null ? tempURLs_.demo2.url : ``}
                  className={`w-full h-full object-cover ${
                    tempURLs_.demo2.url == null ? "opacity-0" : "opacity-100"
                  } ${
                    tempURLs_.demo2.url == null ? "opacity-0" : "opacity-100"
                  }`}
                />
              </div>
            </div>
            <div
              className={`w-[160px] h-[160px] bg-black/50 rounded-[3px] mx-[1px] cursor-pointer hover:bg-black/80 transition-all hover:duration-75 duration-1000 mt-1 mr-auto overflow-hidden`}
              onClick={() => {
                handleFileInputClick("demo3");
              }}
            >
              <img
                src={tempURLs_.demo3.url != null ? tempURLs_.demo3.url : ``}
                className={`w-full h-full object-cover ${
                  tempURLs_.demo3.url == null ? "opacity-0" : "opacity-100"
                } ${tempURLs_.demo3.url == null ? "opacity-0" : "opacity-100"}`}
              />
            </div>
          </div>
          <BlackBubble_
            value={`Input your property's address..`}
            icon={faLocation}
          />
          <div
            className={`text-[12px] text-black/80 italic rounded-[3px] flex flex-row justify-center ml-auto m-1 min-w-8 p-2 px-3`}
          >
            <Autocomplete_ />
          </div>
          <BlackBubble_
            value={`Write a brief description of your property..`}
            icon={faHouse}
          />
          <Input_ value={`desc`} />
          <BlackBubble_
            value={`How many rooms are available?`}
            icon={faHouse}
          />
          <Input_ value={`rooms`} />
          <BlackBubble_
            value={`How much is a room per student?`}
            icon={faDollarSign}
          />
          <Input_ value={`price`} />
          <BlackBubble_
            value={`What is your preferred gender to accommodate?`}
            icon={faVenusMars}
          />
          <div className={`w-[120px] h-[20px] text-[13px] text-black/80 hover:text-white/80 cursor-pointer transition-all duration-200 hover:bg-black/40 bg-black/20 rounded-[4px] ml-[80px] flex flex-col justify-center items-center`}>
            -- -- --
          </div>
          <BrandButton_ value={`create`} />
        </div>
        {[
          { action: handleFileChange, id: "cover" },
          { action: handleFileChange, id: "demo1" },
          { action: handleFileChange, id: "demo2" },
          { action: handleFileChange, id: "demo3" },
        ].map((obj_, index) => {
          return (
            <input
              className="hidden"
              key={index}
              type="file"
              id={`${obj_.id}`}
              onChange={obj_.action}
              accept="image/jpeg, image/png"
              multiple
            />
          );
        })}
      </div>
    </div>
  );
};

export default Create_;

interface Parent_Props {}

const Parent_ = ({}: Parent_Props) => {
  const [menu_, setMenu_] = useRecoilState(MenuState);
  const [cache_, setCache_] = useRecoilState(CacheState);
  const [markerData, setMarkerData] = useRecoilState(MarkerState);
  const [open_, setOpen_] = useRecoilState(OpenState);
  const [focus_, setFocus_] = useRecoilState(FocusState);
  const [deep_, setDeep_] = useRecoilState(DepthState);
  return (
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
                  title: "",
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
  );
};
