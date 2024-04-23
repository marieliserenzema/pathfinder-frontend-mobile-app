import { atom, type RecoilState } from 'recoil';
import * as Location from "expo-location";

// @ts-ignore
const locationAtom : RecoilState<Location.LocationObject | string> = atom({
    key: 'location',
    default: "none"
});

export default locationAtom;