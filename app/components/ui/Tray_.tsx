import { useRecoilState } from "recoil";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import { Loader } from "@googlemaps/js-api-loader";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/navigation";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  CacheState,
  FocusState,
  MenuState,
  OpenState,
  UserState,
  DepthState,
  LocationState,
  MarkerState,
} from "../atoms/atoms";
import { createLocation_, getLocations } from "@/firebase";
import { useEffect, useState } from "react";
import { Setup_ } from "./Setup_";
import { v4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faAngleRight,
  faBoltLightning,
  faCar,
  faDroplet,
  faGlobeAfrica,
  faHouse,
  faIdBadge,
  faImage,
  faImages,
  faLocation,
  faMoon,
  faQuestion,
  faShield,
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

interface Tray_Props {}

const Tray_ = ({}: Tray_Props) => {
  const [menu_, setMenu_] = useRecoilState(MenuState);
  const [markerData, setMarkerData] = useRecoilState(MarkerState);
  const [loading_, setLoading_] = useState(false);
  // const router = useRouter();
  const [deep_, setDeep_] = useRecoilState(DepthState);
  const [cache_, setCache_] = useRecoilState(CacheState);
  const [open_, setOpen_] = useRecoilState(OpenState);
  const [focus_, setFocus_] = useRecoilState(FocusState);
  const [location_, setLocation_] = useRecoilState(LocationState);
  const [rooms_, setRooms_] = useState();
  const [price_, setPrice_] = useState();
  const [desc_, setDesc_] = useState();
  const [user_, setUser_] = useRecoilState(UserState);
  const [tempURLs_, setTempURLs_] = useState({
    cover: null,
    demo1: null,
    demo2: null,
    demo3: null,
  });
  const [content_, setContent_] = useState({
    cover: null,
    demo1: null,
    demo2: null,
    demo3: null,
  });

  const router = useRouter();
  const reloadPage = () => {
    window.location.reload()
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files_ = event.target.files;

    // Check if demo3 property is null
    if (content_.demo3 === null) {
      console.log("We're in");
      console.log();

      // Convert the file to a Blob
      const blob = new Blob([files_[0]]);

      // Create an object URL from the Blob
      const objectURL = URL.createObjectURL(blob);
      setTempURLs_((prevURLs) => ({
        ...prevURLs,
        [event.target.id]: objectURL,
      }));

      // // Create a new Map from content_ and set the new file
      // const x = new Map(Object.entries(content_));
      // x.set(event.target.id, files_[0]);

      // // Update the content_ object with the new values
      // setContent_(Object.fromEntries(x));

      // Check if there are 3 non-null values in content_
      if (
        Object.values(content_).filter((value) => value !== null).length === 3
      ) {
        // setContent_(Object.fromEntries(x));
        setContent_(tempURLs_);
        // uploadData(Object.fromEntries(x));
        // Call your function or handle your logic
      }

      return;
    }
  };

  const uploadData = (data_: any) => {
    setLoading_(true);
    console.log("processing upload..");
    const files = Object.values(data_).filter((value) => value !== null);
    // const files: any = [];

    // Validate file types, size, and number of files
    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024; // 5MB
    const maxFiles = 4;

    if (files.length > maxFiles) {
      alert(`Please select a maximum of ${maxFiles} files.`);
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!allowedTypes.includes(file?.type)) {
        alert(`File type not allowed for file ${file?.name}.`);
        return;
      }

      if (file?.size > maxSize) {
        alert(`File size exceeds the limit for file ${file?.name}.`);
        return;
      }
    }

    // If all validations pass, update the selected files state
    // setSelectedFiles(Array.from(files));
    storeImages([...files]);
    // console.log(files)
    // handleMock_();
  };

  const handleFileInputClick = (id: any) => {
    document?.getElementById(id)?.click();
  };

  const storeImages = async (images: any) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      const uploadPromises: any = [];

      images.forEach((image: any, index: any) => {
        const fileName = image.name;
        const storageRef = ref(
          storage,
          `location/${location_.address}/` + v4()
        );
        const uploadTask = uploadBytesResumable(storageRef, image);

        const uploadPromise = new Promise((resolveUpload, rejectUpload) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Handle upload progress if needed
            },
            (error) => {
              rejectUpload(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolveUpload(downloadURL);
              });
            }
          );
        });

        uploadPromises.push(uploadPromise);
      });

      Promise.all(uploadPromises)
        .then((downloadURLs) => {
          // Now 'downloadURLs' is an array of download URLs for all uploaded images
          const imagesList = downloadURLs.map((downloadURL) => ({
            url: downloadURL,
          }));

          const uuid_ = v4();
          const postedBy_ = user_.uid;
          const timestamp_ = Timestamp.now();

          const obj_ = new Map();

          obj_.set("rooms", rooms_);
          obj_.set("deposit", price_);
          obj_.set("uuid", uuid_);
          obj_.set("images", imagesList);
          obj_.set("postPrivacy", { details: false, visible: false });
          obj_.set("postDesc", desc_);
          obj_.set("postAddress", location_);
          obj_.set("postedBy", postedBy_);
          obj_.set("rating", 2.5);
          obj_.set(
            "postedOn",
            timestamp_ // new Date(timestamp_)
          );

          console.log(Object.fromEntries(obj_));
          createLocation_(Object.fromEntries(obj_));
        })
        .then(() => {
          setLoading_(false);
          setMenu_(deep_.data);
          setDeep_({ logic: false, data: deep_.data });
          // Add a relaod function
          reloadPage();
        })
        .catch((error) => {
          reject(error);
          setLoading_(false);
        });
    });
  };

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
      <div className={`m-auto flex flex-col items-center justify-start h-screen min-w-2 overflow-hidden overflow-y-scroll pb-[50px] absolute top-0 right-1 ${
          menu_ == ""
            ? "mr-[0px] duration-200 opacity-100 pointer-events-auto"
            : "mr-[-15px] duration-0 opacity-0 pointer-events-none"
        } transition-all`}>
      <Home_/>
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
              className={`w-[332px] min-h-[165px] bg-black/40 rounded flex flex-col justify-center items-center cursor-pointer hover:bg-black/80 transition-all hover:duration-75 duration-1000 my-1 overflow-hidden relative shadow-md opacity-70 hover:opacity-100`}
              onClick={() => {
                if(focus_ == obj){
                  setOpen_(true);
                }else{
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
                From <span className={`font-medium ml-1 text-black mr-[0.5px]`}>R{obj.deposit}</span>
              </div>
              <div
                className={`text-[12px] text-black/80 italic bg-white/80 px-1 rounded ml-auto m-1  absolute bottom-0 right-0`}
              >
                Brief description of property
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
            30 Pierre Olleman Street, Brandwag, Bloemfontein
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
                console.log(tempURLs_)
              }}
            >
              <img
                src={tempURLs_.cover != null ? tempURLs_.cover : ``}
                className={`w-full h-full object-cover ${
                  tempURLs_.cover == null ? "opacity-0" : "opacity-100"
                }`}
              />
            </div>
            <div
              className={`px-1 rounded m-1 mb-0 flex flex-col justify-center items-start py-[1.5px] w-full h-[50px] mt-1`}
            >
              <p className={`text-[17px] font-semibold text-black _oswald`}>
                {location_.address ? location_.address : 'Your Address Goes Here .. !!'}
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
                  src={tempURLs_.demo1 != null ? tempURLs_.demo1 : ``}
                  className={`w-full h-full object-cover ${
                    tempURLs_.demo1 == null ? "opacity-0" : "opacity-100"
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
                  src={tempURLs_.demo2 != null ? tempURLs_.demo2 : ``}
                  className={`w-full h-full object-cover ${
                    tempURLs_.demo2 == null ? "opacity-0" : "opacity-100"
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
                src={tempURLs_.demo3 != null ? tempURLs_.demo3 : ``}
                className={`w-full h-full object-cover ${
                  tempURLs_.demo3 == null ? "opacity-0" : "opacity-100"
                }`}
              />
            </div>
          </div>
          <div
            className={`text-[12px] text-black/70 bg-white/80 px-2 rounded-[3px] mr-auto m-1 mb-2 flex flex-row justify-center items-center py-[1.5px] pb-4 invert max-w-[70%]`}
          >
            <FontAwesomeIcon
              icon={faLocation}
              className={`mr-1 my-[2px] mb-auto`}
            />{" "}
            Input your property's address..
          </div>
          <div
            className={`text-[12px] text-black/80 italic rounded-[3px] flex flex-row justify-center ml-auto m-1 min-w-8 p-2 px-3`}
          >
            {/* <div
              className={`w-[20px] h-full flex flex-col justify-center items-end cursor-pointer hover:pr-[8px] pr-1 transition-all duration-200`}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </div> */}
            {/* <input type="text" placeholder="Start typing here.." /> */}
            <Autocomplete_ />
          </div>
          <div
            className={`text-[12px] text-black/70 bg-white/80 px-2 rounded-[3px] mr-auto m-1 mb-2 flex flex-row justify-center items-center py-[1.5px] pb-4 invert max-w-[70%]`}
          >
            <FontAwesomeIcon
              icon={faHouse}
              className={`mr-1 my-[2px] mb-auto`}
            />{" "}
            Write a brief description of your property..
          </div>
          <div
            className={`text-[12px] text-black/80 italic rounded-[3px] flex flex-row justify-center ml-auto m-1 min-w-8 p-2 px-3`}
          >
            {/* <div
              className={`w-[20px] h-full flex flex-col justify-center items-end cursor-pointer hover:pr-[8px] pr-1 transition-all duration-200`}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </div> */}
            <input
              type="text"
              placeholder="Start typing here.."
              onChange={(e) => {
                setDesc_(e.target.value);
              }}
            />
          </div>
          <div
            className={`text-[12px] text-black/70 bg-white/80 px-2 rounded-[3px] mr-auto m-1 mb-2 flex flex-row justify-center items-center py-[1.5px] pb-4 invert max-w-[70%]`}
          >
            <FontAwesomeIcon
              icon={faHouse}
              className={`mr-1 my-[2px] mb-auto`}
            />{" "}
            How many rooms are available?
          </div>
          <div
            className={`text-[12px] text-black/80 italic rounded-[3px] flex flex-row justify-center ml-auto m-1 min-w-8 p-2 px-3`}
          >
            {/* <div
              className={`w-[20px] h-full flex flex-col justify-center items-end cursor-pointer hover:pr-[8px] pr-1 transition-all duration-200`}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </div> */}
            <input
              type="text"
              placeholder="Start typing here.."
              onChange={(e) => {
                setRooms_(e.target.value);
              }}
            />
          </div>
          <div
            className={`text-[12px] text-black/70 bg-white/80 px-2 rounded-[3px] mr-auto m-1 mb-2 flex flex-row justify-center items-center py-[1.5px] pb-4 invert max-w-[70%]`}
          >
            <FontAwesomeIcon
              icon={faHouse}
              className={`mr-1 my-[2px] mb-auto`}
            />{" "}
            How much is a room per student?
          </div>
          <div
            className={`text-[12px] text-black/80 italic rounded-[3px] flex flex-row justify-center ml-auto m-1 min-w-8 p-2 px-3`}
          >
            {/* <div
              className={`w-[20px] h-full flex flex-col justify-center items-end cursor-pointer hover:pr-[8px] pr-1 transition-all duration-200`}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </div> */}
            <input
              type="text"
              placeholder="Start typing here.."
              onChange={(e) => {
                setPrice_(e.target.value);
              }}
            />
          </div>
          <div className={`w-full h-[80px] mt-8`}>
            <div
              className={`w-full h-[60px] flex flex-col justify-end pr-2 items-end rounded bg-black hover:bg-blue-900/90 ml-auto mt-auto relative text-white/50 font-black text-[20px] cursor-pointer transition-all duration-1000 hover:duration-75`}
              onClick={() => {
                uploadData(content_)
              }}
            >
              .W
              <div
                className={`w-full h-full flex flex-col justify-center items-center absolute top-0 left-0 text-white/90 font-black text-[22px] pt-5 hover:pb-4 transition-all duration-1000 hover:duration-75`}
              >
                {loading_ ? (
                  <FontAwesomeIcon icon={faMoon} className={`animate-spin`} />
                ) : (
                  "CREATE"
                )}
              </div>
            </div>
          </div>
        </div>
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
};

export default Tray_;

export const Autocomplete_ = () => {
  const [location_, setLocation_] = useRecoilState(LocationState);
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  return (
    <Combobox
      onSelect={async (address_) => {
        setValue(address_);
        const results = await getGeocode({ address: address_ });
        const { lat, lng } = await getLatLng(results[0]);
        setLocation_({
          address: address_,
          lat: lat,
          lng: lng,
        });
        console.log("location created !!");
      }}
    >
      <ComboboxInput
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className={`w-full h-[35px] text-[13px]  rounded-[2px]  pl-2`}
        placeholder={`Search for an address..`}
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption
                key={place_id}
                value={description}
                className={`cursor-pointer bg-black/30 hover:bg-black/60 transition-all duration-1000 hover:duration-75 rounded-[2px] hover:scale-[98%] backdrop-blur-md font-medium min-w-2 min-h-2 p-1 my-[1px] text-[13px] text-white/80`}
                onClick={() => {
                  clearSuggestions();
                }}
              />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
