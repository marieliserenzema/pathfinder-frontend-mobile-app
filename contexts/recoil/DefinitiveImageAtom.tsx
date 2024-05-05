import { atom, type RecoilState } from "recoil";

import capturedImageModel from "../../models/CapturedImageModel";

// @ts-ignore
const definitiveImageAtom: RecoilState<capturedImageModel | undefined> = atom({
  key: "definitiveImage",
  default: undefined,
});

export default definitiveImageAtom;
