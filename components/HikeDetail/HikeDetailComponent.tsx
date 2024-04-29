import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import MapView, { Geojson } from "react-native-maps";
import { useSetRecoilState } from "recoil";

import tabAtom from "../../contexts/recoil/TabAtom";
import selectedHikeAtom from "../../contexts/recoil/selectedHikeAtom";
import HikeModel from "../../models/HikeModel";
import CommentComponent from "../CommentComponent/CommentComponent";

export default function HikeDetailComponent({ hike }: { hike: HikeModel }) {
  const setSelectedHike = useSetRecoilState(selectedHikeAtom);
  const setActiveTab = useSetRecoilState(tabAtom);
  const navigation = useNavigation();

  const handleSelectHike = () => {
    setSelectedHike(hike);
    setActiveTab("map");
    // @ts-ignore
    navigation.navigate("Home");
  };

  const selectedHikeDraw = {
    type: "FeatureCollection",
    features: [
      {
        type: hike.type,
        properties: hike.properties,
        geometry: {
          type: hike.geometry.type,
          coordinates: hike.geometry.coordinates,
        },
      },
    ],
  };

  //todo boucle sur les étoiles et afficher le type d'étoiles selon le compte

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{hike.properties.name}</Text>
      <View style={styles.details_container}>
        <View style={styles.image_container}>
          <Image
            style={styles.image}
            source={require("../../assets/hike.jpeg")}
          />
        </View>
      </View>
      <View style={styles.details_container}>
        <View style={styles.details}>
          <View style={styles.description}>
            <FontAwesome5
              name="walking"
              size={16}
              color="#a3b18a"
              style={styles.icon}
            />
            <Text>{hike.properties.distance} km</Text>
          </View>
          <View style={styles.rating}>
            <AntDesign name="star" size={16} color="#a3b18a" />
            <AntDesign name="star" size={16} color="#a3b18a" />
            <AntDesign name="star" size={16} color="#a3b18a" />
            <AntDesign name="staro" size={16} color="#a3b18a" />
            <AntDesign name="staro" size={16} color="#a3b18a" />
          </View>
          <View style={styles.description}>
            <AntDesign
              name="clockcircleo"
              size={16}
              color="#a3b18a"
              style={styles.icon}
            />
            <Text>1 heure</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSelectHike}>
        <Text style={styles.buttonText}>Commencer le suivi</Text>
      </TouchableOpacity>
      <Text style={styles.descriptionText}>{hike.properties.description}</Text>
      <MapView
        style={{ width: "100%", height: "40%", padding: "1%" }}
        region={{
          latitude: hike.geometry.coordinates[0][1],
          longitude: hike.geometry.coordinates[0][0],
          latitudeDelta: 0.045,
          longitudeDelta: 0.0421,
        }}
      >
        <Geojson
          geojson={selectedHikeDraw}
          strokeColor="red"
          fillColor="green"
          strokeWidth={2}
        />
      </MapView>
      <View style={styles.commentSection}>
        <CommentComponent hikeId={hike._id} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: "1%",
    overflow: "hidden",
    elevation: 3,
    padding: "1%",
  },
  details_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  image_container: {
    width: "100%",
    padding: "1%",
    borderRadius: 10,
  },
  image: {
    borderRadius: 10,
    width: "100%",
    height: 150,
    objectFit: "cover",
  },
  details: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#a3b18a",
  },
  rating: {
    display: "flex",
    flexDirection: "row",
  },
  description: {
    display: "flex",
    flexDirection: "row",
  },
  icon: {
    marginRight: "3%",
  },
  button: {
    backgroundColor: "#a3b18a",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  descriptionText: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
  },
  commentSection: {
    marginTop: 20,
    // Add more styles as needed
  },
});
