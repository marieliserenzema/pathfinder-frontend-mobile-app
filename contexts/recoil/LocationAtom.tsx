import * as Location from "expo-location";
import { atom, type RecoilState } from "recoil";

// @ts-ignore
const locationAtom: RecoilState<Location.LocationObject | undefined> = atom({
  key: "location",
  default: undefined,
});

export default locationAtom;
