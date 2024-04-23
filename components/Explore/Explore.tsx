import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import HikeComponent from '../HikeComponent/HikeComponent';
import client from '../../client/client';
import { useUserContext } from '../../contexts/UserContext';
import Header from '../Header/Header';
import MapScreen from "../Map/Map";
import {useRecoilState, useSetRecoilState} from "recoil";
import hikesAtom from "../../contexts/atoms/HikesAtom";
import locationAtom from "../../contexts/atoms/LocationAtom";
import * as Location from "expo-location";

export default function ExploreScreen() {
  const { token} = useUserContext();
  const [activeTab, setActiveTab] = useState('map');
  const [hikes, setHikes] = useRecoilState(hikesAtom);
  const setLocation = useSetRecoilState(locationAtom);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("useeffect explore");
    const fetchHikes = async () => {
      try {
        if (!token) return;
        const hikesData = await client.getAllHikes(token);
        setHikes(hikesData.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchHikes();

    const getLocation = async () => {
      try {
        if (!token) return;
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }
        console.log(status);
        let userLocation = await Location.getCurrentPositionAsync({});
        console.log("latitude: " + userLocation.coords.latitude + ", longitude: " + userLocation.coords.longitude);
        setLocation(userLocation);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getLocation();
  }, []);

  const toggleTab = (tab: any) => {
    setActiveTab(tab);
  };

  if(isLoading) {
    return <View><Text>Pouet</Text></View>;
  } else {
    return (
        <>
          <View style={styles.header}>
            <Header/>
          </View>
          <View style={styles.tabHeader}>
            <TouchableOpacity style={[styles.tab, activeTab === 'map' && styles.activeTab]}
                              onPress={() => toggleTab('map')}>
              <Text style={[activeTab === 'map' && styles.activeTabText]}>Carte</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tab, activeTab === 'list' && styles.activeTab]}
                              onPress={() => toggleTab('list')}>
              <Text style={[activeTab === 'list' && styles.activeTabText]}>Liste</Text>
            </TouchableOpacity>
          </View>
          {activeTab === 'map' ? (
              <View style={styles.scroll_view}>
                <MapScreen/>
              </View>
          ) : (
              <ScrollView style={styles.scroll_view}>
                {typeof hikes !== "string" ? hikes.map((hike, index) => {
                  return <HikeComponent key={index} hike={hike}/>;
                }) : null}
              </ScrollView>
          )}
        </>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 60,
  },
  tabHeader: {
    flexDirection: 'row',
    width: '100%',
  },
  tab: {
    width: '50%',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
  },
  activeTab: {
    borderBottomColor: '#a3b18a',
  },
  activeTabText: {
    color: '#a3b18a',
    fontWeight: 'bold',
  },
  scroll_view: {
    flex: 1,
    height: "100%",
    width: "100%"
  }
});



