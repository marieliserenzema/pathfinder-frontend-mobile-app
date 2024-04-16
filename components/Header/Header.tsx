import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function Header() {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../../assets/icon.png')} />
            <AntDesign name="search1" size={30} color='red' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center',
        padding: '1%'
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 100,
    }

});



