import { useRecoilState } from "recoil";
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
    DescState,
  LocationState, PriceState, RoomState,
} from "../atoms/atoms";

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

  interface Input_Props {
    value: string
  }
   
  const Input_ = ({value}:Input_Props) => {
  const [rooms_, setRooms_] = useRecoilState(RoomState);
  const [price_, setPrice_] = useRecoilState(PriceState);
  const [desc_, setDesc_] = useRecoilState(DescState);
    return ( 
        <div
            className={`text-[12px] text-black/80 italic rounded-[3px] flex flex-row justify-center ml-auto m-1 min-w-8 p-2 px-3`}
          >
            <input
              type="text"
              placeholder="Start typing here.."
              onChange={(e) => {
                value == 'desc' && setDesc_(e.target.value);
                value == 'room' && setRooms_(e.target.value);
                value == 'price' && setPrice_(e.target.value);
              }}
            />
          </div>
     );
  }
   
  export default Input_;