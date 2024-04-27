import { atom, type RecoilState } from 'recoil';
import HikeModel from "../../models/HikeModel";

//todo just use the id ?

// @ts-ignore
const selectedHikeAtom : RecoilState<HikeModel | undefined> = atom({
    key: 'hike',
    default: undefined
});

export default selectedHikeAtom;