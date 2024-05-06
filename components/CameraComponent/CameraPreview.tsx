import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { useRecoilState, useSetRecoilState } from "recoil";
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


import capturedImageAtom from "../../contexts/recoil/CapturedImageAtom";
import definitiveImageAtom from "../../contexts/recoil/DefinitiveImageAtom";
import photoModeAtom from "../../contexts/recoil/PhotoModeAtom";
import previewAtom from "../../contexts/recoil/previewAtom";

const CameraPreview = ({ photo }: any) => {
  const setPreviewVisible = useSetRecoilState(previewAtom);
  const [capturedImage, setCapturedImage] = useRecoilState(capturedImageAtom);
  const setDefinitiveImage = useSetRecoilState(definitiveImageAtom);
  const setPhotoMode = useSetRecoilState(photoModeAtom);

  const savePhoto = () => {
    setDefinitiveImage(capturedImage);
    setPreviewVisible(false);
    setCapturedImage(undefined);
    setPhotoMode(false);
  };

  const closePreview = () => {
    setPreviewVisible(false);
    setCapturedImage(undefined);
  };

  return (
    <>
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={styles.image}
      >
        <TouchableOpacity style={styles.closeButton} onPress={closePreview}>
          <Feather name="x" size={50} color="white" />
        </TouchableOpacity>
        <View style={styles.saveButtonBorder}>
          <TouchableOpacity style={styles.saveButton} onPress={savePhoto}>
            <MaterialIcons name="done" size={50} color="black" />
          </TouchableOpacity>
        </View>

      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  closeButton: {
    alignSelf: "flex-start",
  },
  saveButtonBorder: {
    position: "absolute",
    alignSelf: "center",
    bottom: 20,
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  saveButton: {
    width: 70,
    height: 70,
    padding: '2%',
    borderRadius: 50,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CameraPreview;
