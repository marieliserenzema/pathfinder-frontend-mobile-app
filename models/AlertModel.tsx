import { LatLng } from "react-native-maps";

interface AlertModel {
  _id: string;
  userId: string;
  hikeId: string;
  description: string;
  coordinate: LatLng;
  photo: string;
}

export default AlertModel;
