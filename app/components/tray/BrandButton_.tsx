import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState } from "recoil";
import { ContentState, DepthState, DescState, LoadingState, LocationState, MenuState, PriceState, RoomState, TempState, UserState } from "../atoms/atoms";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { createLocation_ } from "@/firebase";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { v4 } from "uuid";
import { Timestamp } from "firebase/firestore";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface BrandButton_Props {
    value: string
}
 
const BrandButton_ = ({value}:BrandButton_Props) => {
  const [loading_, setLoading_] = useRecoilState(LoadingState);
  const [location_, setLocation_] = useRecoilState(LocationState);
  const [menu_, setMenu_] = useRecoilState(MenuState);
  const [deep_, setDeep_] = useRecoilState(DepthState);
  const [rooms_, setRooms_] = useRecoilState(RoomState);
  const [price_, setPrice_] = useRecoilState(PriceState);
  const [desc_, setDesc_] = useRecoilState(DescState);
  const [user_, setUser_] = useRecoilState(UserState);
  const [tempURLs_, setTempURLs_] = useRecoilState(TempState);
  const [content_, setContent_] = useRecoilState(ContentState);

  const upperCaseValue = value.toUpperCase()

  const getAllFiles = () => {
              // @ts-ignore
    const files = Object.values(tempURLs_).map((image) => image?.file).filter(Boolean);
    return files;
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

      // @ts-ignore
      if (!allowedTypes.includes(file?.type)) {
      // @ts-ignore
        alert(`File type not allowed for file ${file?.name}.`);
        return;
      }

      // @ts-ignore
      if (file?.size > maxSize) {
        // @ts-ignore
        alert(`File size exceeds the limit for file ${file?.name}.`);
        return;
      }
    }

    // If all validations pass, update the selected files state
    storeImages([...files]);
  };

  const storeImages = async (images: any) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      const uploadPromises: any = [];



      getAllFiles().forEach((image: any, index: any) => {
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
          console.log("We busy")
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

  const router = useRouter();
  const reloadPage = () => {
    window.location.reload()
  };

    return ( <div className={`w-full h-[80px] mt-8 z-0`}>
    <div
      className={`w-full h-[60px] flex flex-col justify-end pr-2 items-end rounded bg-black hover:bg-blue-900/90 ${loading_ && "bg-blue-900/90" } ml-auto mt-auto relative text-white/50 font-black text-[20px] cursor-pointer transition-all duration-1000 hover:duration-75`}
      onClick={() => {
        uploadData(content_)
      }}
    >
      .W
      <div
        className={`w-full h-full flex flex-col justify-center items-center absolute top-0 left-0 text-white/90 font-black text-[22px] pt-2 ${loading_ ? 'pb-3' : 'hover:pb-3'} transition-all duration-1000 hover:duration-75`}
      >
        {
        loading_ ? (
          <FontAwesomeIcon icon={faSpinner} className={`animate-spin`} />
        ) : (
          upperCaseValue
        )}
      </div>
    </div>
  </div> );
}
 
export default BrandButton_;