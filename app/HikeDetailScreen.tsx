import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import client from "../client/client";
import HikeDetailComponent from "../components/HikeDetail/HikeDetailComponent";
import { useUserContext } from "../contexts/UserContext";
import HikeModel from "../models/HikeModel";


export default function HikeDetailScreen({ route, navigation }: { route: any }) {
  const { token } = useUserContext();
  const [oneHike, setOneHike] = useState<HikeModel | null>(null);
  const hikeId = route.params.hikeId;

  useEffect(() => {
    (async () => {
      if (!token) return;
      const newHike: HikeModel = await client.getHikeById(token, hikeId);
      setOneHike(newHike);

    })();
  }, [token, hikeId]);


  const handleGoBack = () => {
    navigation.navigate("Home");
  };

  if (oneHike) {
    return (
      <ScrollView style={styles.container}>
        <AntDesign name="back" size={24} color="black" style={styles.backIcon} onPress={handleGoBack} />
        <HikeDetailComponent hike={oneHike} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backIcon: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
    backgroundColor: "white",
    borderRadius: 20,
  },
});
