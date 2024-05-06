import { Camera } from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRecoilState, useSetRecoilState } from "recoil";
import Feather from '@expo/vector-icons/Feather';

import CameraPreview from "./CameraPreview";
import capturedImageAtom from "../../contexts/recoil/CapturedImageAtom";
import photoModeAtom from "../../contexts/recoil/PhotoModeAtom";

export default function CameraComponent() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const setPhotoMode = useSetRecoilState(photoModeAtom);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useRecoilState(capturedImageAtom);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ textAlign: "center" }}>
          Nous avpons besoin de votre permission pour utiliser la caméra
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  let camera: Camera;

  const __takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync();
    setPreviewVisible(true);
    setCapturedImage(photo);
  };

  const closeCamera = () => {
    setPhotoMode(false);
    setCapturedImage(undefined);
  };

  return (
    <>
      {previewVisible && capturedImage ? (
        <CameraPreview photo={capturedImage} />
      ) : (
        <Camera
          style={styles.camera}
          ref={(r: Camera) => {
            camera = r;
          }}
        >
          <TouchableOpacity style={styles.closeButton} onPress={closeCamera}>
            <Feather name="x" size={50} color="white" />
          </TouchableOpacity>
          <View style={styles.cameraButtonBorder}>
            <TouchableOpacity
              onPress={__takePicture}
              style={styles.cameraButton}
            />
          </View>
        </Camera>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  closeButton: {
    alignSelf: "flex-start",
  },
  cameraButtonBorder: {
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
  cameraButton: {
    width: 70,
    height: 70,
    padding: '2%',
    borderRadius: 50,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
  },
});
