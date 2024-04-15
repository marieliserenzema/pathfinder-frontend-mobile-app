import { View } from "react-native";
import MapView from "react-native-maps";
import React, {useEffect, useState} from "react";
import * as Location from "expo-location";

export default function MapScreen() {
    const [location, setLocation] = useState<Location.LocationObject>();
    const [errorMsg, setErrorMsg] = useState<string>();

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
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
        return <View />;
    }

    return (
        <View>
            <MapView style={{width:'100%', height:'100%'}}
                     initialRegion={region}
                     showsUserLocation={true}
            />
        </View>
    )
}
