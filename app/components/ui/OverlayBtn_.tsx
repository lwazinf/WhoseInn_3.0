import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { OpenState } from "../atoms/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

interface OverlayBtn_Props {}

const OverlayBtn_ = ({}: OverlayBtn_Props) => {
  const [open_, setOpen_] = useRecoilState(OpenState);
  const [flag, setFlag] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Function to toggle the flag from false to true
    const toggleFlag = () => {
      setFlag(true);

      // Set a timeout to turn the flag back to false after 5 seconds
      setTimeout(() => {
        setFlag(false);
      }, 1000);
    };

    // Initial call to start the cycle
    toggleFlag();

    // Set an interval to toggle the flag every 30 seconds
    const intervalId = setInterval(toggleFlag, 15000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs only once on mount

  async function sendQuery() {
    try {
      const result = await fetch('/api/read', {
        method: "POST",
        body: JSON.stringify("where are we?")
      })
      const json = await result.json()
      console.log(json)
    } catch (err) {
      console.log('err:', err)
    }
  }

  const handleLinkClick = () => {
    // Open the link in a new tab
    window.open("https://x.com/lwazinf", "_blank");
    // sendQuery()
  };
  return (
    <div
      className={`mt-auto flex flex-col justify-center items-center absolute bottom-6 right-6`}
    >
      {/* <p className={`text-black/70 text-[13px] font-normal`}>
            Testing
          </p> */}
      <div
        className={`flex flex-row justify-start items-center relative bg-black/80 hover:bg-black p-2 py-1 text-white rounded cursor-pointer transition-all ${
          !flag ? "duration-200" : "duration-1000"
        } ${open_ ? "invert-0" : flag && "invert"}`}
        onClick={() => {
          handleLinkClick()
        }}
      >
        <p className={`text-[12px] font-medium cursor-pointer`}>Connect</p>
        <FontAwesomeIcon icon={faXTwitter} className={`ml-1 cursor-pointer`} />
      </div>
    </div>
  );
};

export default OverlayBtn_;
