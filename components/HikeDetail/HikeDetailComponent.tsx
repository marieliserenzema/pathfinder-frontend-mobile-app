import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import MapView, { Geojson } from "react-native-maps";
import { useSetRecoilState } from "recoil";

import client from "../../client/client";
import { useUserContext } from "../../contexts/UserContext";
import commentsListAtom from "../../contexts/recoil/CommentsListAtom";
import hikesAtom from "../../contexts/recoil/HikesAtom";
import selectedHikeAtom from "../../contexts/recoil/SelectedHikeAtom";
import tabAtom from "../../contexts/recoil/TabAtom";
import CommentModel from "../../models/CommentModel";
import HikeModel from "../../models/HikeModel";
import getTimeFromDistance from "../../utils/distance_to_hours";
import CommentComponent from "../CommentComponent/CommentComponent";
import EntryComponent from "../CommentComponent/EntryComponent";

export default function HikeDetailComponent({ hike }: { hike: HikeModel }) {
  const { token } = useUserContext();
  const setSelectedHike = useSetRecoilState(selectedHikeAtom);
  const setActiveTab = useSetRecoilState(tabAtom);
  const navigation = useNavigation();
  const setComments = useSetRecoilState(commentsListAtom);
  const [stars, setStars] = useState<number>(0);
  const setHikes = useSetRecoilState(hikesAtom);

  useEffect(() => {
    if (!token) return;
    client
      .getAllCommentsByHike(token, hike._id)
      .then((r: CommentModel[]) => setComments(r));
    setStars(hike.stars);
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

  const fetchHikesAfterUpdate = async () => {
    try {
      if (!token) return;
      const hikesData = await client.getAllHikes(token);
      setHikes(hikesData.items);
    } catch (error) {
      alert("Error fetching hikes after stars update : " + error);
    }
  };

  const time = getTimeFromDistance(hike.properties.distance);

  const handleUpdateStars = (star: number) => {
    if (!token) return;
    client
      .updateStars(token, hike._id, star)
      .then((r: HikeModel) => (setStars(r.stars), fetchHikesAfterUpdate()));
  };

  const renderStars = () => {
    const starsArray = Array.from({ length: 5 }, (_, i) => i + 1);
    return (
      <View style={styles.rating}>
        {starsArray.map((star) => (
          <TouchableOpacity key={star} onPress={() => handleUpdateStars(star)}>
            <AntDesign
              name={star <= stars ? "star" : "staro"}
              size={16}
              color="#a3b18a"
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

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
        {renderStars()}
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
