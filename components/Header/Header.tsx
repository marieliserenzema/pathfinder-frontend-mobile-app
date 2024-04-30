import React from "react";
import { View, StyleSheet, Image } from "react-native";
import SearchBar from "../SearchBar/SearchBar";

export default function Header() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../assets/icon.png")} />
      <SearchBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    padding: "1%",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
});
