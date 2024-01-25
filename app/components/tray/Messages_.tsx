import {
  faAngleRight,
  faLocation,
  faStar,
  faStarHalf,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState } from "recoil";
import { CacheState, DepthState, MenuState, UserState } from "../atoms/atoms";
import { useEffect, useState } from "react";
import { db, getMessages } from "@/firebase";
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import BlackBubble_ from "./Bubble_";

interface Messages_Props {}

const Messages_ = ({}: Messages_Props) => {
  const [menu_, setMenu_] = useRecoilState(MenuState);
  const [deep_, setDeep_] = useRecoilState(DepthState);
  const [user_, setUser_] = useRecoilState(UserState);
  const [messages, setMessages] = useState([]);
  const [prompt_, setPrompt_] = useState([]);
  const [data_, setData_] = useState({});

  const URL = "https://api.openai.com/v1/chat/completions";

  const getData = async (userMessage: any) => {
    const payload = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            `give me exactly what I ask from you, only return a list of ids`,
        },
        {
          role: "user",
          content: `${userMessage.trim()}`,
        },
      ],
      temperature: 0.2,
    //   stream: true,
    };

    try {
      const response = await fetch(URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        try{
          console.log(JSON.parse(data.choices[0].message.content))
        } catch {
          console.log('error detected')
        }
      } else {
        console.error("Failed to fetch data from the API");
        return { data: "An error occurred.", origin: "robot" };
      }
    } catch (error) {
      console.error("Error in fetching data:", error);
        // @ts-ignore
      return { data: `An error occurred: ${error.message}`, origin: "robot" };
    }
  };

  async function sendQuery(data__:any) {
    try {
      const result = await fetch("/api/read", {
        method: "POST",
        body: JSON.stringify(
          `which ids have: ${data__} in their address`
        ),
      });
      const json = await result.json();
      const final_ = await getData(
        `return only a list of the ids in this text: (${json.data}).`
      );
      console.log(final_);

      // if(JSON.parse(json.data)){console.log(JSON.parse(toString(json.data)))}else{
      //   console.log('No list found')
      // }
    } catch (err) {
      console.log("err:", err);
    }
  }

  useEffect(() => {
    if (user_) {
      console.log(user_?.uid);
      const colRef = collection(db, "messages");
      const q = query(colRef, where("lead", "array-contains", user_?.uid));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const updatedMessages = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        // @ts-ignore
        setMessages(updatedMessages);
      });

      return () => {
        // Unsubscribe from the snapshot listener when the component unmounts
        unsubscribe();
      };
    }
  }, [user_]);
  return (
    <div className={``}>
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
            Address Goes Here
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
          {data_ &&
            user_ &&
        // @ts-ignore
            data_.data?.map((obj, index) => {
              console.log(obj);
              return (
                <BlackBubble_
                  isThisYou={user_.uid == obj.sender}
                  icon={null}
                  value={user_ && obj.data}
                  key={index}
                />
              );
            })}
          {/* <BlackBubble_ isThisYou={user_==data_.data[0].sender} icon={faLocation} value={'Location'} />
          <BlackBubble_ isThisYou={user_==data_.data[0].sender} icon={null} value={'Is it the house on Craftsman Street?'} /> */}
          <div
            className={`text-[12px] text-black/80 italic rounded-[3px] flex flex-row justify-center ml-auto m-1 min-w-8 p-2 px-3`}
          >
            <div
              className={`w-[20px] h-full flex flex-col justify-center items-end cursor-pointer hover:pr-[8px] pr-1 transition-all duration-200`}
              onClick={() => {
                sendQuery(prompt_);
              }}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </div>
            <input
              type="text"
              placeholder="Start typing here.."
              onChange={(e) => {
        // @ts-ignore
                setPrompt_(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div
        className={`m-auto flex flex-col items-center justify-start h-screen min-w-2 px-6 overflow-hidden overflow-y-scroll pb-[50px] absolute top-0 right-1 ${
          menu_ == "Messages"
            ? "mr-[0px] duration-200 opacity-100 pointer-events-auto"
            : "mr-[-15px] duration-0 opacity-0 pointer-events-none"
        } transition-all`}
      >
        {messages.map((obj, index) => {
          return (
            <div
              key={index}
              className={`w-[332px] min-h-[100px] bg-black/40 rounded flex flex-col justify-center items-center cursor-pointer hover:bg-black/80 transition-all duration-200 my-1`}
              onClick={() => {
                setMenu_("Inbox");
                setDeep_({ logic: true, data: menu_ });
                setData_(obj);
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
    </div>
  );
};

export default Messages_;
