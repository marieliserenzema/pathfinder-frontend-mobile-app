import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import HikeModel from '../../models/HikeModel';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import getTimeFromDistance from '../../utils/distance_to_hours';
import { useUserContext } from '../../contexts/UserContext';

export default function HikeComponent({ hike }: { hike: HikeModel }) {

    const { addToFavorite, isFavorite, removeFromFavorite } = useUserContext();

    const time = getTimeFromDistance(hike.distance);

    const favorite = () => {
        if (isFavorite(hike._id)) {
            removeFromFavorite(hike._id);
        }
        else {
            addToFavorite(hike._id);
        }
    }


    return (
        <View style={styles.card}>
            <TouchableOpacity style={styles.favoriteIcon} onPress={favorite}>
                {
                    isFavorite(hike._id) ?
                        <AntDesign name="heart" size={16} color="white" /> :
                        <AntDesign name="hearto" size={16} color="white" />
                }
            </TouchableOpacity>
            <View style={styles.container}>
                <View style={styles.image_container}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/hike.jpeg')}
                    />
                </View>
                <View style={styles.description_container} >
                    <Text style={styles.title} numberOfLines={1}>
                        {hike.name}
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
                                {hike.distance} km
                            </Text>
                        </View>
                    </View>
                    <View style={styles.description}>
                        <AntDesign name="clockcircleo" size={16} color="#a3b18a" style={styles.icon} />
                        <Text>
                            {time}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    card: {
        flex: 1,
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
    }

});
