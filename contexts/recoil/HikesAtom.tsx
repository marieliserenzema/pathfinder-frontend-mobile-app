import { atom, type RecoilState } from "recoil";

import HikeModel from "../../models/HikeModel";

// @ts-ignore
const hikesAtom: RecoilState<HikeModel[] | undefined> = atom({
  key: "hikes",
  default: undefined,
});

export default hikesAtom;
