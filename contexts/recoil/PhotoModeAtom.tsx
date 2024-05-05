import { atom, type RecoilState } from "recoil";

// @ts-ignore
const photoModeAtom: RecoilState<boolean> = atom({
  key: "photo",
  default: false,
});

export default photoModeAtom;
