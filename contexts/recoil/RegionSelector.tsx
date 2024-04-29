import { selector } from "recoil";

import locationAtom from "./LocationAtom";
import selectedHikeAtom from "./selectedHikeAtom";

const regionSelectorState = selector({
  key: "regionSelector",
  get: ({ get }) => {
    const locationState = get(locationAtom);
    const selectedHike = get(selectedHikeAtom);
    if (selectedHike) {
      return {
        latitude: selectedHike.geometry.coordinates[0][1],
        longitude: selectedHike.geometry.coordinates[0][0],
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
    }
    if (!locationState) {
      return {
        //Paris
        latitude: 48.8566,
        longitude: 2.3522,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
    }
    return {
      latitude: locationState.coords.latitude,
      longitude: locationState.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  },
});

export default regionSelectorState;
