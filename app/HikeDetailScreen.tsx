import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useSetRecoilState } from "recoil";

import client from "../client/client";
import HikeDetailComponent from "../components/HikeDetail/HikeDetailComponent";
import { useUserContext } from "../contexts/UserContext";
import tabAtom from "../contexts/recoil/TabAtom";
import HikeModel from "../models/HikeModel";

export default function HikeDetailScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const { token } = useUserContext();
  const [oneHike, setOneHike] = useState<HikeModel | null>(null);
  const hikeId = route.params.hikeId;
  const setActiveTab = useSetRecoilState(tabAtom);

  useEffect(() => {
    (async () => {
      if (!token) return;
      const newHike: HikeModel = await client.getHikeById(token, hikeId);
      setOneHike(newHike);
    })();
  }, [token, hikeId]);

  const handleGoBack = () => {
    setActiveTab("map");
    navigation.navigate("Home");
  };

  if (oneHike) {
    return (
      <>
        <AntDesign
          name="back"
          size={24}
          color="black"
          style={styles.backIcon}
          onPress={handleGoBack}
        />
        <HikeDetailComponent hike={oneHike} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  backIcon: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
    backgroundColor: "white",
    borderRadius: 20,
  },
});
