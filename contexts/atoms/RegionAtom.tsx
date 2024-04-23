import { atom, type RecoilState } from 'recoil';
import RegionModel from "../../models/RegionModel";

const regionAtom : RecoilState<RegionModel> = atom({
    key: 'regions',
    //Paris
    default: {
        latitude: 48.8566,
        longitude: 2.3522,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    },
});

export default regionAtom;