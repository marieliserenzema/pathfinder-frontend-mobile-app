import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import MapView, { Geojson, Marker } from "react-native-maps";
import { useRecoilValue } from "recoil";

import { useUserContext } from "../../contexts/UserContext";
import hikesAtom from "../../contexts/recoil/HikesAtom";
import regionSelectorState from "../../contexts/recoil/RegionSelector";
import selectedHikeAtom from "../../contexts/recoil/selectedHikeAtom";
import HikePinModel from "../../models/HikePinModel";

export default function MapScreen() {
  const { token } = useUserContext();
  const selectedHike = useRecoilValue(selectedHikeAtom);
  const regionSelector = useRecoilValue(regionSelectorState);
  const hikes = useRecoilValue(hikesAtom);
  const [hikesMarkers, setHikesMarkers] = useState<HikePinModel[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    console.log("useEffect map");
    if (!token) return;

    if (hikes) {
      hikes.map((hike, _) => {
        const hikePin: HikePinModel = {
          id: hike._id,
          latitude: hike.geometry.coordinates[0][1],
          longitude: hike.geometry.coordinates[0][0],
          name: hike.properties.name,
          description: hike.properties.description,
        };
        setHikesMarkers((hikesMarkers) => [...hikesMarkers, hikePin]);
      });
    }
  }, []);

  const selectedHikeDraw = {
    type: "FeatureCollection",
    features: [
      {
        type: selectedHike?.type,
        properties: selectedHike?.properties,
        geometry: {
          type: selectedHike?.geometry.type,
          coordinates: selectedHike?.geometry.coordinates,
        },
      },
    ],
  };

  //todo when selected, add a start hike button that remove other pins and add the possibility to create alert

  return (
    <View>
      <MapView
        style={{ width: "100%", height: "100%" }}
        region={regionSelector}
        showsUserLocation
      >
        {hikesMarkers
          ? hikesMarkers.map((hikeMarker, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: hikeMarker.latitude,
                    longitude: hikeMarker.longitude,
                  }}
                  title={hikeMarker.name}
                  onPress={(event) => {
                    // @ts-ignore
                    navigation.navigate("HikeDetail", {
                      hikeId: hikeMarker.id,
                    });
                  }}
                />
              );
            })
          : []}
        <Geojson
          geojson={selectedHikeDraw}
          strokeColor="red"
          fillColor="green"
          strokeWidth={2}
        />
      </MapView>
    </View>
  );
}
