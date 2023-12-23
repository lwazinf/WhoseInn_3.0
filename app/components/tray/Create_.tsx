import { faDollarSign, faHouse, faImage, faLocation, faStar } from "@fortawesome/free-solid-svg-icons";
import BlackBubble_ from "../ui/Bubble_";
import Input_, { Autocomplete_ } from "./AutoComplete_";
import BrandButton_ from "../ui/BrandButton_";
import { useRecoilState } from "recoil";
import { ContentState, LocationState, MenuState, TempState } from "../atoms/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Create_Props {
    
}
 
const Create_ = ({}:Create_Props) => {
  const [menu_, setMenu_] = useRecoilState(MenuState);
  const [tempURLs_, setTempURLs_] = useRecoilState(TempState);
  const [location_, setLocation_] = useRecoilState(LocationState);
  const [content_, setContent_] = useRecoilState(ContentState);

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
                className={`w-full h-full object-cover ${tempURLs_.cover.url == null ? 'opacity-0' : 'opacity-100'} ${
                  tempURLs_.cover.url == null ? "opacity-0" : "opacity-100"
                }`}
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
                  className={`w-full h-full object-cover ${tempURLs_.demo1.url == null ? 'opacity-0' : 'opacity-100'} ${
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
                  className={`w-full h-full object-cover ${tempURLs_.demo2.url == null ? 'opacity-0' : 'opacity-100'} ${
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
                className={`w-full h-full object-cover ${tempURLs_.demo3.url == null ? 'opacity-0' : 'opacity-100'} ${
                  tempURLs_.demo3.url == null ? "opacity-0" : "opacity-100"
                }`}
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
     );
}
 
export default Create_;