import { View } from "react-native";
import MapView, {Geojson} from "react-native-maps";
import React, {useEffect, useState} from "react";
import client from '../../client/client';
import {useUserContext} from "../../contexts/UserContext";
import HikeModel from "../../models/HikeModel";
import {useRecoilState, useRecoilValue} from "recoil";
import regionSelectorState from "../../contexts/recoil/RegionSelector";
import selectedHikeAtom from "../../contexts/recoil/selectedHikeAtom";

export default function MapScreen() {
    const {token} = useUserContext();
    const [selectedHike, setSelectedHike] = useRecoilState(selectedHikeAtom);
    const regionSelector = useRecoilValue(regionSelectorState);

    useEffect(() => {
        (async () => {
            console.log("useeffect map");
            if (!token) return;
            const oneHike: HikeModel = await client.getHikeById(token, "6627613a9ca4476ed56aac80");
            setSelectedHike(oneHike);
        })();
    }, []);

    //todo use the region as a bbox to center on hikes when needed
    //todo check if a hike is selected, if so center on it, else center on user location (not both a the same time)

    const hike = {
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

    return (
        <View>
            <MapView style={{width: '100%', height: '100%'}}
                     initialRegion={regionSelector}
                     showsUserLocation={true}
            >
                <Geojson
                    geojson={hike}
                    strokeColor="red"
                    fillColor="green"
                    strokeWidth={2}
                />
            </MapView>
        </View>
    )
}
