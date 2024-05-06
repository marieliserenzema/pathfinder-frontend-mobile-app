import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import { useUserContext } from "../../contexts/UserContext";
import HikeModel from "../../models/HikeModel";
import getTimeFromDistance from "../../utils/distance_to_hours";

export default function HikeComponent({ hike }: { hike: HikeModel }) {
  const { token } = useUserContext();
  const { favoriteHikes, updateFavoriteHike } = useUserContext();
  const navigation = useNavigation();
  const [stars, setStars] = useState<number>(0);

  useEffect(() => {
    if (!token) return;
    setStars(hike.stars);
  }, [hike._id, token]);

  const isFavorite = (id: string) => {
    return favoriteHikes.some((hike) => hike._id === id);
  };

  const time = getTimeFromDistance(hike.properties.distance);
  const handleFavorite = () => {
    updateFavoriteHike(hike._id);
  };

  const renderStars = () => {
    const starsArray = Array.from({ length: 5 }, (_, i) => i + 1);
    return (
      <View style={styles.rating}>
        {starsArray.map((star, index) => (
          <AntDesign
            key={index}
            name={star <= stars ? "star" : "staro"}
            size={16}
            color="#a3b18a"
          />
        ))}
      </View>
    );
  };

  const navigateToHikeDetail = () => {
    // @ts-ignore
    navigation.navigate("HikeDetail", {
      hikeId: hike._id,
    });
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.favoriteIcon} onPress={handleFavorite}>
        {isFavorite(hike._id) ? (
          <AntDesign name="heart" size={16} color="white" />
        ) : (
          <AntDesign name="hearto" size={16} color="white" />
        )}
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.image_container}>
          <Image
            style={styles.image}
            source={require("../../assets/hike.jpeg")}
          />
        </View>
        <View style={styles.description_container}>
          <Text style={styles.title} numberOfLines={1}>
            {hike.properties.name}
          </Text>
          {renderStars()}
          <View>
            <View style={styles.description}>
              <FontAwesome5
                name="walking"
                size={16}
                color="#a3b18a"
                style={styles.icon}
              />
              <Text>{hike.properties.distance} km</Text>
            </View>
          </View>
          <View style={styles.description}>
            <AntDesign
              name="clockcircleo"
              size={16}
              color="#a3b18a"
              style={styles.icon}
            />
            <Text>{time}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={navigateToHikeDetail}>
        <Text style={styles.buttonText}>Voir plus</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "white",
    margin: "1%",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
  },
  favoriteIcon: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },
  container: {
    display: "flex",
    flexDirection: "row",
  },
  image_container: {
    width: "30%",
    padding: "1%",
    borderRadius: 10,
  },
  image: {
    borderRadius: 10,
    width: "100%",
    height: 100,
    objectFit: "cover",
  },
  description_container: {
    padding: "1%",
    width: "70%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
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
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#a3b18a",

    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
  },
});
