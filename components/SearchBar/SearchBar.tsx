import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import client from '../../client/client';
import { useUserContext } from '../../contexts/UserContext';
import { useRecoilState } from 'recoil';
import hikesAtom from '../../contexts/recoil/HikesAtom';

const SearchBar = () => {
    const { token } = useUserContext();
    const [hikes, setHikes] = useRecoilState(hikesAtom);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async () => {
        if (!token) return;
        var hikesData;
        if (searchTerm === '') {
            hikesData = await client.getAllHikes(token);
        } else {
            hikesData = await client.getHikeByLocation(token, searchTerm);
        }
        setHikes(hikesData.items);
    };

    useEffect(() => {
        const fetchData = async () => {
            handleSearch();
        };

        fetchData();

    }, [searchTerm, token]);


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Rechercher..."
                value={searchTerm}
                onChangeText={setSearchTerm}
            />
            <AntDesign name="search1" size={20} color="gray" onPress={handleSearch} style={styles.icon} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '70%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 30,
    },
    input: {
        flex: 1,
        height: 30,
        paddingLeft: 10,
    },
    icon: {
        paddingRight: 10,
    }
});

export default SearchBar;