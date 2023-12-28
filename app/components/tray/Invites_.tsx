import { useRecoilState } from "recoil";
import { CacheState, MenuState } from "../atoms/atoms";

interface Invites_Props {
    
}
 
const Invites_ = ({}:Invites_Props) => {
    const [menu_, setMenu_] = useRecoilState(MenuState);
    const [cache_, setCache_] = useRecoilState(CacheState);
    return ( 
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
     );
}
 
export default Invites_;