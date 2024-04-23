import { atom, type RecoilState } from 'recoil';
import HikeModel from "../../models/HikeModel";

// @ts-ignore
const hikesAtom : RecoilState<HikeModel[] | string> = atom({
    key: 'hikes',
    default: "none"
});

export default hikesAtom;