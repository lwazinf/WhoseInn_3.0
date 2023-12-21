"use client";

import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import {
  DepthState,
  MenuState,
  NavElementsState,
  OpenState,
  ThisState,
  UserState,
} from "../atoms/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { auth, createLocation_, db, signIn_, signOut_ } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { v4 } from "uuid";
import { Timestamp, doc, serverTimestamp, setDoc } from "firebase/firestore";

interface Nav_Props {}

const Nav_ = ({}: Nav_Props) => {
  const [user_, setUser_] = useRecoilState(UserState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log("User is logged in:", user.uid);

        // Create a new object with the user information
        const newUser = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          dp: user.photoURL /* and other properties */,
        };

        // Set the new user object in your application state
        setUser_(newUser);

        // Additional logic, if needed
      } else {
        // User is signed out
        console.log("User is logged out");

        // Clear user information or perform other actions when the user logs out
        setUser_(null);

        // Additional logic, if needed
      }
    });

    // Cleanup the listener when the component is unmounted
    return () => unsubscribe();
  }, []); // Empty dependency array ensures the effect runs only once on mount
  
  return (
    <div
      className={`min-w-2 min-h-2 absolute left-[-60px] flex flex-col justify-center items-center`}
    >
      <div
        className={`w-[60px] h-[350px] rounded-lg shadow-none bg-white/0 backdrop-blur-md relative left-[76px] flex flex-col justify-center items-center mt-auto`}
      >
        <NavElements_ />
      </div>
    </div>
  );
};

export default Nav_;

interface NavElements_Props {}

const NavElements_ = ({}: NavElements_Props) => {
  const [elements, setElements] = useRecoilState(NavElementsState);
  const [open_, setOpen_] = useRecoilState(OpenState);
  const [showThis_, setShowThis_] = useRecoilState(ThisState);
  const [user_, setUser_] = useRecoilState(UserState);
  const [deep_, setDeep_] = useRecoilState(DepthState);
  const [menu_, setMenu_] = useRecoilState(MenuState);
  const [hoverActive_, setHoverActive_] = useState(-1);
  const [files_, setFiles_] = useState([]);
  const router = useRouter();

  return (
    <div
      className={`min-h-[20px] min-w-[20px] flex flex-col justify-center items-center`}
    >
      {elements.map((obj_, index) => {
        return (
          <div
            className={`h-[60px] w-full flex flex-col justify-center items-center text-[15px] font-black text-black/40 hover:text-black/60 transition-all duration-200 cursor-pointer ${
              hoverActive_ == index
                ? "p-5 pl-6 pr-4 duration-75 opacity-100"
                : "p-5 duration-75 opacity-80"
            } ${
              (open_ || deep_.logic) && (obj_.name == "Messages" || obj_.name == "Invites" || obj_.name == "Providers") && "pointer-events-none cursor-default"
            }`}
            onMouseEnter={() => {
              setHoverActive_(index);
            }}
            onMouseLeave={() => {
              setHoverActive_(-1);
            }}
            onClick={
              obj_.name == "Home"
                ? () => {
                    open_ && setOpen_(false);
                    !open_ && setMenu_("");
                    deep_.logic && setMenu_(deep_.data)
                    !open_ && router.push("/");
                    deep_.logic && setDeep_({logic:false, data:deep_.data})
                    obj_.action;
                  }
                : obj_.name == "Providers"
                ? () => {
                    !open_ && setMenu_("Providers");
                    obj_.action;
                  }
                : obj_.name == "Invites"
                ? () => {
                    !open_ && setMenu_("Invites");
                    obj_.action;
                  }
                : obj_.name == "Messages"
                ? () => {
                    !open_ && setMenu_("Messages");
                    obj_.action;
                  }
                : obj_.name == "Sign In"
                ? () => {
                    if (!user_) {
                      try {
                        signIn_()
                          .then((e) => {
                            console.log(e);
                            // @ts-ignore
                            if (e?.user) {
                              // @ts-ignore
                              setUser_(e?.user);
                            }
                          })
                          .finally(() => {
                            console.log("Logged in..");
                          });
                      } catch {
                        console.log("Error!!");
                      }
                    }
                    user_ && signOut_();
                    obj_.action;
                  }
                : obj_.action
            }
            key={index}
          >
            <FontAwesomeIcon
              icon={
                (open_ || deep_.logic) && obj_.name == "Home"
                  ? obj_.altIcon
                  : user_ && obj_.name == "Sign In"
                  ? obj_.altIcon
                  : obj_.icon
              }
              className={`w-full h-full ${
                open_ && obj_.name == "Home" && ""
              } ${obj_.name == menu_ ? 'text-black/90 animate-pulse hover:text-black/90' : 'text-black/70 hover:text-black/90'} transition-all duration-1000 ${
                (open_ || deep_.logic) && (obj_.name == "Messages" || obj_.name == "Invites" || obj_.name == "Providers") && "opacity-50 duration-75"
              }`}
            />
            <div
              className={`min-h-[20px] min-w-[80px] flex flex-col justify-center items-start p-[2px] absolute text-black/80 ${
                hoverActive_ == index
                  ? "right-[-85px] duration-200 opacity-80"
                  : "right-[-75px] duration-1000 opacity-0"
              } transition-all pointer-events-none invert`}
            >
              <div
                className={`text-left text-black text-[13px] font-normal bg-white/80 backdrop-blur-md shadow-sm rounded-[4px]
                p-0 px-2`}
              >
                {open_ && obj_.name == "Home"
                  ? "Back"
                  : user_ && obj_.name == "Sign In"
                  ? "Sign Out"
                  : obj_.name}
              </div>
            </div>
          </div>
        );
      })}
      
    </div>
  );
};
