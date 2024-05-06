import { useNavigation } from "@react-navigation/native";
import { ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
} from "react-native";
import MapView, { Geojson, Marker } from "react-native-maps";
import { useRecoilState, useRecoilValue } from "recoil";

import client from "../../client/client";
import { storage } from "../../config";
import { useUserContext } from "../../contexts/UserContext";
import definitiveImageAtom from "../../contexts/recoil/DefinitiveImageAtom";
import hikesAtom from "../../contexts/recoil/HikesAtom";
import locationAtom from "../../contexts/recoil/LocationAtom";
import photoModeAtom from "../../contexts/recoil/PhotoModeAtom";
import regionSelectorState from "../../contexts/recoil/RegionSelector";
import selectedHikeAtom from "../../contexts/recoil/SelectedHikeAtom";
import AlertModel from "../../models/AlertModel";
import HikePinModel from "../../models/HikePinModel";
import UserPinModel from "../../models/UserPinModel";
import getBlobFromUri from "../../utils/getBlobFromUri";
import AlertModal from "../AlertModal/AlertModal";
import CameraComponent from "../CameraComponent/CameraComponent";

const pointInBBox = (
  lat: number,
  lon: number,
  bbox: [number, number, number, number],
) => {
  const [minLon, minLat, maxLon, maxLat] = bbox;
  return lat >= minLat && lat <= maxLat && lon >= minLon && lon <= maxLon;
};

export default function MapScreen() {
  const { token, user } = useUserContext();
  const [selectedHike, setSelectedHike] = useRecoilState(selectedHikeAtom);
  const regionSelector = useRecoilValue(regionSelectorState);
  const hikes = useRecoilValue(hikesAtom);
  const [hikesMarkers, setHikesMarkers] = useState<HikePinModel[]>([]);
  const [usersMarkers, setUsersMarkers] = useState<UserPinModel[]>([]);
  const [selectedUserMarker, setSelectedUserMarker] = useState<UserPinModel>();
  const navigation = useNavigation();
  const userLocation = useRecoilValue(locationAtom);
  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [photoMode, setPhotoMode] = useRecoilState(photoModeAtom);
  const [definitiveImage, setDefinitiveImage] =
    useRecoilState(definitiveImageAtom);

  const fetchAlerts = async () => {
    try {
      if (!token) return;
      if (!selectedHike) return;
      return await client.getAllAlertsByHike(token, selectedHike?._id);
    } catch (error) {
      alert("Error fetching alerts : " + error);
    }
  };

  useEffect(() => {
    if (!token) return;

    if (hikes) {
      setHikesMarkers(
        hikes.map((hike) => {
          return {
            id: hike._id,
            latitude: hike.geometry.coordinates[0][1],
            longitude: hike.geometry.coordinates[0][0],
            name: hike.properties.name,
            description: hike.properties.description,
          };
        }),
      );
    }

    if (selectedHike) {
      fetchAlerts().then((r: AlertModel[]) => {
        const usersPinsMarkers = r.map((alert, _) => {
          return {
            id: alert._id,
            userId: alert.userId,
            latitude: alert.coordinate.latitude,
            longitude: alert.coordinate.longitude,
            description: alert.description,
            photo: alert.photo,
          };
        });
        setUsersMarkers(usersPinsMarkers);
      });
    }
  }, [hikes, selectedHike]);

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

  const resetSelectedHike = () => {
    setSelectedHike(undefined);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  // hard value to test position & for demo
  const createAlertModal = () => {
    if (
      selectedHike &&
      userLocation &&
      pointInBBox(43.50755500054189, 5.119654299999968, selectedHike.bbox)
    ) {
      toggleModal();
    } else {
      alert("You're too far from the hike path to create an alert.");
    }
  };

  const handlePhoto = () => {
    setPhotoMode(true);
  };

  const uploadImage = async () => {
    if (!definitiveImage) return;
    const imageName = "img-" + user?._id + "-" + new Date().getTime();
    const storageRef = ref(storage, imageName);
    const blob = await getBlobFromUri(definitiveImage.uri);
    await uploadBytes(storageRef, blob);
    return imageName;
  };

  const handleSubmit = async () => {
    if (!token) return;
    if (!user) return;
    if (!selectedHike) return;
    if (!userLocation) return;
    if (description.length === 0) return;

    let urlToSave;
    if (definitiveImage) {
      urlToSave = await uploadImage();
    }

    //coordinate test for demonstration
    const userCoordinate = {
      latitude: userLocation.coords.latitude,
      longitude: userLocation.coords.longitude,
    };
    const test2 = {
      latitude: 43.50755500054189,
      longitude: 5.119654299999968,
    };

    client
      .createAlert(
        token,
        user._id,
        selectedHike?._id,
        description,
        test2,
        urlToSave,
      )
      .then((alert: AlertModel) => {
        setDescription("");
        setDefinitiveImage(undefined);
        toggleModal();
        const usersPinsMarkers = {
          id: alert._id,
          userId: alert.userId,
          latitude: alert.coordinate.latitude,
          longitude: alert.coordinate.longitude,
          description: alert.description,
          photo: alert.photo,
        };
        setUsersMarkers((prevState) => [...prevState, { ...usersPinsMarkers }]);
      });
  };

  const handleClose = () => {
    toggleModal();
    setDescription("");
    setDefinitiveImage(undefined);
  };

  const showAlert = (userMarker: UserPinModel) => {
    setSelectedUserMarker(userMarker);
    setModalVisible(true);
  };

  //to show a bbox work in demonstration
  const bbox = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [
            [5.11301860000003, 43.493633100541935],
            [5.154473900000009, 43.493633100541935],
            [5.154473900000009, 43.5076123005419],
            [5.11301860000003, 43.5076123005419],
            [5.11301860000003, 43.493633100541935],
          ],
        },
      },
    ],
  };

  if (photoMode) {
    return <CameraComponent />;
  }

  return (
    <View>
      <MapView
        style={{ width: "100%", height: "100%" }}
        region={regionSelector}
        showsUserLocation
      >
        {!selectedHike && hikesMarkers.length
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
        {selectedHike && usersMarkers.length
          ? usersMarkers.map((userMarker, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: userMarker.latitude,
                    longitude: userMarker.longitude,
                  }}
                  onPress={() => showAlert(userMarker)}
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
        <Geojson
          geojson={bbox}
          strokeColor="blue"
          fillColor="green"
          strokeWidth={2}
        />
      </MapView>
      {selectedHike && (
        <View style={styles.view}>
          <TouchableOpacity onPress={createAlertModal} style={styles.button}>
            <Text>Alerter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={resetSelectedHike}
            style={[styles.button, styles.stopButton]}
          >
            <Text>Stop</Text>
          </TouchableOpacity>
        </View>
      )}
      <Modal transparent visible={modalVisible} animationType="fade">
        {selectedUserMarker ? (
          <View style={styles.alertModalContainer}>
            <AlertModal
              userMarker={selectedUserMarker}
              setModalVisible={setModalVisible}
              setSelectedUserMarker={setSelectedUserMarker}
            />
          </View>
        ) : (
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>
                Laisser une description et si vous le souhaitez une photo de ce
                qu'il se produit
              </Text>
              <TextInput
                style={styles.input}
                placeholder="entrer une description..."
                value={description}
                onChangeText={(text) => setDescription(text)}
                multiline
                numberOfLines={4}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={handlePhoto}
                  style={[styles.modalButton, { backgroundColor: "#a3b18a" }]}
                >
                  <Text>Joindre une photo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={[styles.modalButton, { backgroundColor: "#a3b18a" }]}
                >
                  <Text>Confirmer</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={handleClose}
                  style={[styles.modalButton, { backgroundColor: "#a3b18a" }]}
                >
                  <Text>Annuler</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  button: {
    position: "absolute",
    bottom: 10,
    left: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    margin: 5,
  },
  stopButton: {
    bottom: 60,
  },
  alertModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
  },
  title: {
    fontSize: 18,
  },
  input: {
    width: "100%",
    height: 80,
    backgroundColor: "lightgrey",
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
  },
});
