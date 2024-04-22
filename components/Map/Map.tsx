import { View } from "react-native";
import MapView, {Geojson} from "react-native-maps";
import React, {useEffect, useState} from "react";
import * as Location from "expo-location";
import client from '../../client/client';
import {useUserContext} from "../../contexts/UserContext";
import HikeModel from "../../models/HikeModel";

export default function MapScreen() {
    const {token} = useUserContext();
    const [location, setLocation] = useState<Location.LocationObject>();
    const [errorMsg, setErrorMsg] = useState<string>();
    const [testHike , setTestHike] = useState<HikeModel>();

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            if (!token) return;
            const oneHike: HikeModel = await client.getHikeById(token, "66262c42e897f8b9a6fdea8b");
            console.log(oneHike);
            setTestHike(oneHike);
        })();
    }, []);

    let locationInfo = 'Waiting...';
    if (errorMsg) {
        locationInfo = errorMsg;
    } else if (location) {
        locationInfo = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
    }
    console.log(locationInfo);

    // Default = Paris
    const defaultLocation = {
        latitude: 48.8566,
        longitude: 2.3522,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    //use the region as a bbox to center on hikes when needed

    const region = location
        ? {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
        : defaultLocation;

    // Only render the map if the user's location is available
    if (!location) {
        return <View/>;
    }

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
