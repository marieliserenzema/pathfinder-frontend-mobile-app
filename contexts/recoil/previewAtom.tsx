import { atom, type RecoilState } from "recoil";

// @ts-ignore
const previewAtom: RecoilState<boolean> = atom({
  key: "preview",
  default: false,
});

export default previewAtom;
