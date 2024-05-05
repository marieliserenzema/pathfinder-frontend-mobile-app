import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRecoilState, useSetRecoilState } from "recoil";

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
    <View
      style={{
        backgroundColor: "transparent",
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            position: "absolute",
            bottom: 0,
            flexDirection: "row",
            flex: 1,
            width: "100%",
            padding: 20,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              alignSelf: "center",
              flex: 1,
              alignItems: "center",
            }}
          >
            <TouchableOpacity style={styles.button} onPress={closePreview}>
              <Text style={styles.text}>Close preview</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={savePhoto}>
              <Text style={styles.text}>Save Picture</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default CameraPreview;
