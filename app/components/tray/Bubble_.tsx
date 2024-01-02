import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface BlackBubble_Props {
    value: string,
    icon: any,
    isThisYou: boolean
}
 
const BlackBubble_ = ({value, icon, isThisYou = false}:BlackBubble_Props) => {
    return ( <div
        className={`text-[12px] text-black/70 px-2 rounded-[3px] m-1 mb-2 flex flex-row justify-center items-center py-[1.5px] pb-4 ${isThisYou ? 'bg-white/60 ml-auto' : 'bg-white/80 mr-auto'} invert max-w-[70%]`}
      >
        <FontAwesomeIcon
          icon={icon}
          className={`mr-1 my-[2px] mb-auto`}
        />{" "}
        {value}
      </div> );
}
 
export default BlackBubble_;