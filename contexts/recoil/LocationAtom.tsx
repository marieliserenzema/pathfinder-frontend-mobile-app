import { atom, type RecoilState } from 'recoil';
import * as Location from "expo-location";

// @ts-ignore
const locationAtom : RecoilState<Location.LocationObject | undefined> = atom({
    key: 'location',
    default: undefined
});

export default locationAtom;