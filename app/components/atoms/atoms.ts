import {
  faAdd,
  faSearch,
  faTimes,
  faPaperPlane,
  faUser,
  faQrcode,
  faQuestion,
  faPowerOff,
  faAngleLeft,
  faComment,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faHouseCircleCheck } from "@fortawesome/free-solid-svg-icons/faHouseCircleCheck";
import { atom, useRecoilState } from "recoil";

const COMPONENT_NAME = "3.0"

export const NavElementsState = atom({
  key: `${COMPONENT_NAME}/NavElementsState`,
  default: [
    {
      icon: faQrcode,
      altIcon: faAngleLeft,
      name: "Home",
      action: () => {
        console.log('Home or Exit')
      },
    },
    {
      icon: faHouseCircleCheck,
      altIcon: faAdd,
      name: "Providers",
      action: () => {
        console.log('Create :: New accom entry')
      },
    },
    {
      // icon: faQuestion,
      icon: faComment,
      altIcon: faPaperPlane,
      name: "Messages",
      action: () => {
        console.log('Communication')
      },
    },
    {
      // icon: faQuestion,
      icon: faCalendarCheck,
      altIcon: faSearch,
      name: "Invites",
      action: () => {
        console.log('Map function with semantic search :: try return all locations with a certain string of words, by details, by capacity')
      },
    },
    {
      icon: faUser,
      altIcon: faPowerOff,
      name: "Sign In",
      action: () => {
        console.log('Authentication')
      },
    },
  ],
});

export const FocusState = atom({
  key: `${COMPONENT_NAME}/FocusState`,
  default: {},
});

export const FocusImageState = atom({
  key: `${COMPONENT_NAME}/FocusImageState`,
  default: "",
});

export const OpenState = atom({
  key: `${COMPONENT_NAME}/OpenState`,
  default: false,
});

export const ThisState = atom({
  key: `${COMPONENT_NAME}/ThisState`,
  default: false,
});

export const MenuState = atom({
  key: `${COMPONENT_NAME}/MenuState`,
  default: "",
});

export const CacheState = atom({
  key: `${COMPONENT_NAME}/CacheState`,
  default: [],
});

export const CacheDataState = atom({
  key: `${COMPONENT_NAME}/CacheDataState`,
  default: [],
});

export const LocationState = atom<any>({
  key: `${COMPONENT_NAME}/LocationState`,
  default: {},
})

export const RoomState = atom<any>({
  key: `${COMPONENT_NAME}/RoomState`,
  default: null,
})

export const DescState = atom<any>({
  key: `${COMPONENT_NAME}/DescState`,
  default: null,
})

export const LoadingState = atom<any>({
  key: `${COMPONENT_NAME}/LoadingState`,
  default: false,
})

export const TempState = atom<any>({
  key: `${COMPONENT_NAME}/TempState`,
  default: {
    cover: { url: "", file: null },
    demo1: { url: "", file: null },
    demo2: { url: "", file: null },
    demo3: { url: "", file: null },
  },
})

export const ContentState = atom<any>({
  key: `${COMPONENT_NAME}/ContentState`,
  default: {
    cover: null,
    demo1: null,
    demo2: null,
    demo3: null,
  },
})

export const PriceState = atom<any>({
  key: `${COMPONENT_NAME}/PriceState`,
  default: null,
})

export const UserState = atom<any>({
  key: `${COMPONENT_NAME}/UserState`,
  default: null,
})

export const DepthState = atom<any>({
  key: `${COMPONENT_NAME}/DepthState`,
  default: {logic:false, data:""},
})

export const MarkerState = atom({
  key: `${COMPONENT_NAME}/MarkerState`,
  default: {
    coordinates: [-29.106992683815335, 26.192525701845852],
  title: ""
  },
})

export const MarkerState2 = atom({
  key: `${COMPONENT_NAME}/MarkerState2`,
  default: {
    coordinates: [-29.106992683815335, 26.192525701845852],
  title: ""
  },
})

export const RollingState = atom({
  key: `${COMPONENT_NAME}/RollingState`,
  default: [],
})