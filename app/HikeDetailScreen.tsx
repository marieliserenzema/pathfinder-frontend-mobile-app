import React, { useEffect, useState } from 'react';
import HikeDetailComponent from "../components/HikeDetail/HikeDetailComponent";
import client from '../client/client'
import { useUserContext } from "../contexts/UserContext";
import HikeModel from "../models/HikeModel";
import { View } from "react-native";

export default function HikeDetailScreen({ route }) {
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
};
