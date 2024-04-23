import { View } from "react-native";
import MapView, {Geojson} from "react-native-maps";
import React, {useEffect, useState} from "react";
import client from '../../client/client';
import {useUserContext} from "../../contexts/UserContext";
import HikeModel from "../../models/HikeModel";
import {useRecoilState, useRecoilValue} from "recoil";
import regionAtom from "../../contexts/atoms/RegionAtom";
import locationAtom from "../../contexts/atoms/LocationAtom";

export default function MapScreen() {
    const {token} = useUserContext();
    const [testHike , setTestHike] = useState<HikeModel>();
    const [region, setRegion] = useRecoilState(regionAtom);
    const location = useRecoilValue(locationAtom);

    useEffect(() => {
        (async () => {
            console.log("useeffect map");
            if (!token) return;
            const oneHike: HikeModel = await client.getHikeById(token, "6627613a9ca4476ed56aac80");
            setTestHike(oneHike);

            if (typeof location == "string") return;
            const userPositionRegion = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            };
            setRegion(userPositionRegion);
        })();
    }, []);

    //todo use the region as a bbox to center on hikes when needed
    //check if a hike is selected, if so center on it, else center on user location (not both a the same time)

    const hike = {
        type: 'FeatureCollection',
        features: [
            {
                "type": testHike?.type,
                "properties": testHike?.properties,
                "geometry": {
                  "type": testHike?.geometry.type,
                  "coordinates": testHike?.geometry.coordinates,
                }
              }
        ]
      };

    return (
        <View>
            <MapView style={{width: '100%', height: '100%'}}
                     initialRegion={region}
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
