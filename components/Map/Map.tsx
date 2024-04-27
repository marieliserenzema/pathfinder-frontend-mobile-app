import {View} from "react-native";
import MapView, {Geojson, Marker} from "react-native-maps";
import React, {useEffect, useState} from "react";
import {useUserContext} from "../../contexts/UserContext";
import {useRecoilState, useRecoilValue} from "recoil";
import regionSelectorState from "../../contexts/recoil/RegionSelector";
import selectedHikeAtom from "../../contexts/recoil/selectedHikeAtom";
import hikesAtom from "../../contexts/recoil/HikesAtom";
import HikePinModel from "../../models/HikePinModel";
import {useNavigation} from "@react-navigation/native";

export default function MapScreen() {
    const {token} = useUserContext();
    const [selectedHike, setSelectedHike] = useRecoilState(selectedHikeAtom);
    const regionSelector = useRecoilValue(regionSelectorState);
    const hikes = useRecoilValue(hikesAtom);
    const [hikesMarkers, setHikesMarkers] = useState<HikePinModel[]>([]);
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            console.log("useEffect map");
            if (!token) return;

            if (hikes) {
                hikes.map((hike, _) => {
                    const hikePin : HikePinModel = {
                        id: hike._id,
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

    //todo create custom marker component, watch for performance

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
                            onPress={event => {
                                // @ts-ignore
                                navigation.navigate('HikeDetail', {
                                    hikeId: hikeMarker.id,
                                })
                            }}
                        >
                        </Marker>;
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
