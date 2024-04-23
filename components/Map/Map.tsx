import { View } from "react-native";
import MapView, {Geojson, Marker} from "react-native-maps";
import React, {useEffect, useState} from "react";
import client from '../../client/client';
import {useUserContext} from "../../contexts/UserContext";
import HikeModel from "../../models/HikeModel";
import {useRecoilState, useRecoilValue} from "recoil";
import regionSelectorState from "../../contexts/recoil/RegionSelector";
import selectedHikeAtom from "../../contexts/recoil/selectedHikeAtom";
import hikesAtom from "../../contexts/recoil/HikesAtom";
import HikePinModel from "../../models/HikePinModel";

export default function MapScreen() {
    const {token} = useUserContext();
    const [selectedHike, setSelectedHike] = useRecoilState(selectedHikeAtom);
    const regionSelector = useRecoilValue(regionSelectorState);
    const hikes = useRecoilValue(hikesAtom);
    const [hikesMarkers, setHikesMarkers] = useState<HikePinModel[]>([]);

    useEffect(() => {
        (async () => {
            console.log("useEffect map");
            if (!token) return;
            const oneHike: HikeModel = await client.getHikeById(token, "6627c13d1fc1c89b5db6533a");
            setSelectedHike(oneHike);

            if (hikes) {
                hikes.map((hike, _) => {
                    const hikePin : HikePinModel = {
                        latitude: hike.geometry.coordinates[0][1],
                        longitude: hike.geometry.coordinates[0][0],
                        name: hike.properties.name,
                        description: hike.properties.description,
                    }
                    setHikesMarkers(hikesMarkers => [...hikesMarkers, hikePin]);
                })
            }
        })();
    }, []);

    //todo use the region as a bbox to center on hikes when needed
    //todo check if a hike is selected, if so center on it, else center on user location (not both a the same time)

    const selectedHikeDraw = {
        type: 'FeatureCollection',
        features: [
            {
                "type": selectedHike?.type,
                "properties": selectedHike?.properties,
                "geometry": {
                  "type": selectedHike?.geometry.type,
                  "coordinates": selectedHike?.geometry.coordinates,
                }
              }
        ]
    };

    //todo geojson to only appear with selected hike
    //todo list of marker for pins

    return (
        <View>
            <MapView style={{width: '100%', height: '100%'}}
                     region={regionSelector}
                     showsUserLocation={true}
            >
                {hikesMarkers ? hikesMarkers.map((hikeMarker, index) => {
                        return <Marker
                            key={index}
                            coordinate={{latitude: hikeMarker.latitude, longitude: hikeMarker.longitude}}
                            title={hikeMarker.name}
                            description={hikeMarker.description}
                        />;
                    }) : [] }
                <Geojson
                    geojson={selectedHikeDraw}
                    strokeColor="red"
                    fillColor="green"
                    strokeWidth={2}
                />
            </MapView>
        </View>
    )
}
