import { ref, getDownloadURL } from "firebase/storage";
import React, { Dispatch, SetStateAction, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import { storage } from "../../config";
import UserPinModel from "../../models/UserPinModel";

interface Props {
  userMarker: UserPinModel;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedUserMarker: Dispatch<SetStateAction<UserPinModel | undefined>>;
}

const AlertModal: React.FC<Props> = ({
  userMarker,
  setModalVisible,
  setSelectedUserMarker,
}) => {
  const [photoLink, setPhotoLink] = useState("");

  getDownloadURL(ref(storage, userMarker.photo))
    .then((url) => {
      setPhotoLink(url);
    })
    .catch((error) => {
      // Handle any errors
      console.log(error);
    });

  const handleClose = () => {
    setModalVisible(false);
    setSelectedUserMarker(undefined);
  };
  return (
    <View style={styles.modalContent}>
      <View>
        <Text>{userMarker.description}</Text>
        <Text>{userMarker.userId}</Text>
        {photoLink !== "" ? (
          <Image style={styles.image} source={{ uri: photoLink }} />
        ) : (
          []
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleClose}
          style={[styles.modalButton, { backgroundColor: "#a3b18a" }]}
        >
          <Text>Fermer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    borderRadius: 20,
    width: "80%",
    height: "40%",
    justifyContent: "space-between",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
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
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});

export default AlertModal;
