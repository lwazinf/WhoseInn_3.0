import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface BlackBubble_Props {
    value: string,
    icon: any
}
 
const BlackBubble_ = ({value, icon}:BlackBubble_Props) => {
    return ( <div
        className={`text-[12px] text-black/70 bg-white/80 px-2 rounded-[3px] mr-auto m-1 mb-2 flex flex-row justify-center items-center py-[1.5px] pb-4 invert max-w-[70%]`}
      >
        <FontAwesomeIcon
          icon={icon}
          className={`mr-1 my-[2px] mb-auto`}
        />{" "}
        {value}
      </div> );
}
 
export default BlackBubble_;