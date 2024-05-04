import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { useRecoilState, useSetRecoilState } from "recoil";

import client from "../../client/client";
import { useUserContext } from "../../contexts/UserContext";
import hikesAtom from "../../contexts/recoil/HikesAtom";
import locationAtom from "../../contexts/recoil/LocationAtom";
import tabAtom from "../../contexts/recoil/TabAtom";
import Header from "../Header/Header";
import HikeComponent from "../HikeComponent/HikeComponent";
import MapScreen from "../Map/Map";

export default function ExploreScreen() {
  const { token } = useUserContext();
  const [activeTab, setActiveTab] = useRecoilState(tabAtom);
  const [hikes, setHikes] = useRecoilState(hikesAtom);
  const setLocation = useSetRecoilState(locationAtom);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHikes = async () => {
    try {
      if (!token) return;
      return await client.getAllHikes(token);
    } catch (error) {
      console.error(error);
    }
  };

  const getLocation = async () => {
    try {
      if (!token) return;
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      return await Location.getCurrentPositionAsync({});
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("useEffect explore");
    fetchHikes().then((r) => setHikes(r.items));
    getLocation().then((r) => (setLocation(r), setIsLoading(false)));
  }, []);

  const toggleTab = (tab: any) => {
    setActiveTab(tab);
  };

  if (isLoading) {
    return <View />;
  } else {
    return (
      <>
        <View style={styles.header}>
          <Header />
        </View>
        <View style={styles.tabHeader}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "map" && styles.activeTab]}
            onPress={() => toggleTab("map")}
          >
            <Text style={[activeTab === "map" && styles.activeTabText]}>
              Carte
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "list" && styles.activeTab]}
            onPress={() => toggleTab("list")}
          >
            <Text style={[activeTab === "list" && styles.activeTabText]}>
              Liste
            </Text>
          </TouchableOpacity>
        </View>
        {activeTab === "map" ? (
          <View style={styles.scroll_view}>
            <MapScreen />
          </View>
        ) : (
          <ScrollView style={styles.scroll_view}>
            {hikes
              ? hikes.map((hike, index) => {
                  return <HikeComponent key={index} hike={hike} />;
                })
              : null}
          </ScrollView>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 60,
  },
  tabHeader: {
    flexDirection: "row",
    width: "100%",
  },
  tab: {
    width: "50%",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
  },
  activeTab: {
    borderBottomColor: "#a3b18a",
  },
  activeTabText: {
    color: "#a3b18a",
    fontWeight: "bold",
  },
  scroll_view: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
});
