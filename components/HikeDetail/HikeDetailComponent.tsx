import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import MapView, { Geojson } from "react-native-maps";
import { useSetRecoilState } from "recoil";

import client from "../../client/client";
import { useUserContext } from "../../contexts/UserContext";
import commentsListAtom from "../../contexts/recoil/CommentsListAtom";
import selectedHikeAtom from "../../contexts/recoil/SelectedHikeAtom";
import tabAtom from "../../contexts/recoil/TabAtom";
import CommentModel from "../../models/CommentModel";
import HikeModel from "../../models/HikeModel";
import CommentComponent from "../CommentComponent/CommentComponent";
import EntryComponent from "../CommentComponent/EntryComponent";
import getTimeFromDistance from "../../utils/distance_to_hours";

export default function HikeDetailComponent({ hike }: { hike: HikeModel }) {
  const { token } = useUserContext();
  const setSelectedHike = useSetRecoilState(selectedHikeAtom);
  const setActiveTab = useSetRecoilState(tabAtom);
  const navigation = useNavigation();
  const setComments = useSetRecoilState(commentsListAtom);

  useEffect(() => {
    console.log("useEffect comment");
    if (!token) return;
    client
      .getAllCommentsByHike(token, hike._id)
      .then((r: CommentModel[]) => setComments(r));
  }, [hike._id, token]);

  const screenHeight = Dimensions.get("window").height;
  const mapHeight = screenHeight * 0.4;

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

  const time = getTimeFromDistance(hike.properties.distance);

  //todo boucle sur les étoiles et afficher le type d'étoiles selon le compte

  return (
    <>
      <MapView
        style={{ width: "100%", height: mapHeight }}
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
      <View style={styles.container}>
        <Text style={styles.title}>{hike.properties.name}</Text>
        <View style={styles.rating}>
          <AntDesign name="star" size={16} color="#a3b18a" />
          <AntDesign name="star" size={16} color="#a3b18a" />
          <AntDesign name="star" size={16} color="#a3b18a" />
          <AntDesign name="staro" size={16} color="#a3b18a" />
          <AntDesign name="staro" size={16} color="#a3b18a" />
        </View>

        <Text style={styles.descriptionText}>
          {hike.properties.description}
        </Text>
        <View style={styles.iconsContainer}>
          <View style={styles.iconRow}>
            <AntDesign
              name="clockcircleo"
              size={16}
              color="#a3b18a"
              style={styles.icon}
            />
            <Text>{time}</Text>
          </View>
          <View style={styles.iconRow}>
            <FontAwesome5
              name="walking"
              size={16}
              color="#a3b18a"
              style={styles.icon}
            />
            <Text>{hike.properties.distance} km</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSelectHike}>
          <Text style={styles.buttonText}>Commencer le suivi</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.commentSectionTitle}>Avis</Text>
          <CommentComponent />
          <EntryComponent hikeId={hike._id} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#a3b18a",
    paddingVertical: 10,
  },
  rating: {
    display: "flex",
    flexDirection: "row",
  },
  descriptionText: {
    fontSize: 14,
    paddingVertical: 40,
  },
  iconsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconRow: {
    display: "flex",
    flexDirection: "row",
  },
  icon: {
    marginRight: 5,
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

  commentSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#a3b18a",
    marginVertical: 16,
  },
});
