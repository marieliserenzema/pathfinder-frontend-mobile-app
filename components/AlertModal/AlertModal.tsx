import { ref, getDownloadURL } from "firebase/storage";
import React, { Dispatch, SetStateAction, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Feather from '@expo/vector-icons/Feather';
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

  if (userMarker.photo) {
    getDownloadURL(ref(storage, userMarker.photo))
      .then((url) => {
        setPhotoLink(url);
      })
      .catch((error) => {
        alert("Error downloading alert photo : " + error.message);
      });
  }

  const handleClose = () => {
    setModalVisible(false);
    setSelectedUserMarker(undefined);
  };
  return (
    <View style={styles.modalContent}>

      {photoLink !== "" ? (
        <>
          <TouchableOpacity onPress={handleClose} style={styles.backIcon}>
            <Feather name="x" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.description}>{userMarker.description}</Text>
          <Image style={styles.image} source={{ uri: photoLink }} />
        </>


      ) : (
        < View style={styles.row}>
          <TouchableOpacity onPress={handleClose}>
            <Feather name="x" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.description}>{userMarker.description}</Text>
        </View>

      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    marginTop: 20,
    width: 300,
    height: 300,
    resizeMode: "cover",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  }
});

export default AlertModal;
