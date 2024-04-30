import React, { useEffect, useState } from "react";
import { View } from "react-native";

import client from "../client/client";
import HikeDetailComponent from "../components/HikeDetail/HikeDetailComponent";
import { useUserContext } from "../contexts/UserContext";
import HikeModel from "../models/HikeModel";

export default function HikeDetailScreen({ route }: { route: any }) {
  const { token } = useUserContext();
  const [oneHike, setOneHike] = useState<HikeModel | null>(null);
  const hikeId = route.params.hikeId;

  useEffect(() => {
    (async () => {
      console.log("useEffect detail");
      if (!token) return;
      const newHike: HikeModel = await client.getHikeById(token, hikeId);
      setOneHike(newHike);
    })();
  }, [token, hikeId]);

  if (oneHike) {
    return (
      <View>
        <HikeDetailComponent hike={oneHike} />
      </View>
    );
  }
}
