import { useRecoilState } from "recoil";
import { ThisState, UserState } from "../atoms/atoms";
import { useEffect, useState } from "react";
import { auth, signIn_ } from "@/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

interface Auth_Props {}

const Auth_ = ({}: Auth_Props) => {
  const [showThis_, setShowThis_] = useRecoilState(ThisState);
  return (
    <div
      className={`w-full min-h-screen fixed top-0 left-0 flex flex-col justify-center items-center bg-black/40 backdrop-blur-sm transition-all duration-200 ${
        showThis_
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`w-[300px] md:w-[750px] h-[450px] bg-white backdrop-blur-md rounded-lg shadow-sm relative overflow-hidden`}
      >
        <div
          className={`w-[300px] h-[450px] absolute top-0 md:opacity-100 opacity-0 pointer-events-none`}
        >
          <img
            className={`h-full w-full object-cover md:opacity-100 opacity-0 pointer-events-none`}
            src={`https://images.pexels.com/photos/4939668/pexels-photo-4939668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
          />
        </div>
        <div
          className={`w-[50px] h-[450px] absolute right-0 flex flex-col justify-end items-center py-4 md:bg-white`}
        >
          <Gateway_ />
        </div>
      </div>
    </div>
  );
};

export default Auth_;

interface Gateway_Props {}

const Gateway_ = ({}: Gateway_Props) => {
  const [showThis_, setShowThis_] = useRecoilState(ThisState);
  const [user_, setUser_] = useRecoilState(UserState);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log("User is logged in:", user.uid);
  
        // Create a new object with the user information
        const newUser = { uid: user.uid, displayName: user.displayName, email: user.email, dp: user.photoURL /* and other properties */ };
  
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
      className={`w-[200px] md:w-[400px] h-full absolute top-0 right-[50px] flex flex-col justify-center items-center`}
    >
      <div
        className={`flex relative w-full h-full flex-col items-center justify-center mx-2 
        
         p-2`}
      >
        <div
          className={`flex relative overflow-hidden hover:w-[225px] w-[220px] h-[40px] rounded-md flex-row items-center justify-center mx-2 mt-3 bg-blue-400/80 hover:bg-blue-400 p-2 shadow-sm cursor-pointer hover:text-[15px] text-[16px] text-white/80 hover:text-white transition-all duration-400`}
          onClick={async () => {
            try {
              signIn_()
                .then((e) => {
                  console.log(e)
                  setShowThis_(false);
                  // @ts-ignore
                  if(e?.user){
                    // @ts-ignore
                    setUser_(e?.user)
                  };
                })
                .finally(() => {
                  router.push("/profile");
                });
            } catch {
              console.log("Error!!");
            }
          }}
        >
          <FontAwesomeIcon icon={faGoogle} className={`mr-4`} />
          <p className={`font-bold text-center`}>Login with Google</p>
        </div>

        <div
          className={`flex relative overflow-hidden hover:w-[240px] w-[235px] h-[40px] rounded-md flex-col items-center justify-center mx-2 mt-1 hover:bg-black/50 bg-black/30 p-2 shadow-sm cursor-pointer hover:text-[15px] text-[16px] text-white/80 hover:text-white/80 transition-all duration-400`}
          onClick={() => {
            setShowThis_(false);
          }}
        >
          <p className={`font-bold text-center`}>Return to Landing Page</p>
        </div>
      </div>
    </div>
  );
};
