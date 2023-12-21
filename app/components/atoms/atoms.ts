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

export const LocationState = atom<any>({
  key: `${COMPONENT_NAME}/LocationState`,
  default: {},
})


export const UserState = atom<any>({
  key: 'UserState',
  default: null,
})

export const DepthState = atom<any>({
  key: 'DepthState',
  default: {logic:false, data:""},
})

export const MarkerState = atom({
  key: 'DepthState',
  default: {
    coordinates: [-29.0852, 26.1596],
  title: "string"
  },
})