import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import HikeModel from '../../models/HikeModel';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {useRecoilState, useSetRecoilState} from "recoil";
import selectedHikeAtom from "../../contexts/recoil/selectedHikeAtom";
import {useNavigation} from "@react-navigation/native";
import tabAtom from "../../contexts/recoil/TabAtom";

export default function HikeDetailComponent({ hike }: { hike: HikeModel }) {
    const setSelectedHike = useSetRecoilState(selectedHikeAtom);
    const setActiveTab = useSetRecoilState(tabAtom);
    const navigation = useNavigation();

    const handleSelectHike = () => {
        setSelectedHike(hike);
        setActiveTab('map');
        // @ts-ignore
        navigation.navigate('Home');
    };

    return (
        <View style={styles.card}>
            <View style={styles.container}>
                <View style={styles.image_container}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/hike.jpeg')}
                    />
                </View>
                <View style={styles.description_container} >
                    <Text style={styles.title} numberOfLines={1}>
                        {hike.properties.name}
                    </Text>
                    <View style={styles.rating} >
                        <AntDesign name="star" size={16} color="#a3b18a" />
                        <AntDesign name="star" size={16} color="#a3b18a" />
                        <AntDesign name="staro" size={16} color="#a3b18a" />
                        <AntDesign name="staro" size={16} color="#a3b18a" />
                    </View>
                    <View >
                        <View style={styles.description}>
                            <FontAwesome5 name="walking" size={16} color="#a3b18a" style={styles.icon} />
                            <Text>
                                {hike.properties.distance} km
                            </Text>
                        </View>
                    </View>
                    <View style={styles.description}>
                        <AntDesign name="clockcircleo" size={16} color="#a3b18a" style={styles.icon} />
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSelectHike}>
                <Text style={styles.buttonText}>Show Hike</Text>
            </TouchableOpacity>
        </View >
    );
}

const styles= StyleSheet.create({
    card: {
        backgroundColor: 'white',
        margin: '1%',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 3,
    },
    favoriteIcon: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1,
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
    },
    image_container: {
        width: '30%',
        padding: '1%',
        borderRadius: 10
    },
    image: {
        borderRadius: 10,
        width: '100%',
        height: 100,
        objectFit: 'cover'
    },
    description_container: {
        padding: '1%',
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'

    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    rating: {
        display: 'flex',
        flexDirection: 'row',
    },
    description: {
        display: 'flex',
        flexDirection: 'row',
    },
    icon: {
        marginRight: '3%'
    },
    button: {
        backgroundColor: '#a3b18a',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },

});
