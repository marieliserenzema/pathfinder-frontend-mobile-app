import { atom, type RecoilState } from "recoil";

import capturedImageModel from "../../models/CapturedImageModel";

// @ts-ignore
const capturedImageAtom: RecoilState<capturedImageModel | undefined> = atom({
  key: "capturedImage",
  default: undefined,
});

export default capturedImageAtom;
