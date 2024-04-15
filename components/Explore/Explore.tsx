import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import HikeModel from '../../models/HikeModel';
import HikeComponent from '../HikeComponent/HikeComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import client from '../../client/client';
import { useUserContext } from '../../contexts/UserContext';
import mapDataToHikeModel from '../../utils/map_data_to_hike_model';

export default function ExploreScreen() {

  const { token } = useUserContext();
  const [activeTab, setActiveTab] = useState('map');
  const [hikes, setHikes] = useState<HikeModel[]>([]);

  useEffect(() => {
    const fetchHikes = async () => {
      try {
        if (!token) return;
        const hikesData = await client.getHikes(token);
        const parsedHikes = hikesData.data.map(mapDataToHikeModel);
        setHikes(parsedHikes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHikes();
  }, [token]);

  const toggleTab = (tab: any) => {
    setActiveTab(tab);
  };

  return (
    <SafeAreaView style={styles.container} >
      <Text>Explore Screen !</Text>

      <View style={styles.tabHeader}>
        <TouchableOpacity style={[styles.tab, activeTab === 'map' && styles.activeTab]} onPress={() => toggleTab('map')}>
          <Text style={[activeTab === 'map' && styles.activeTabText]} >Carte</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'list' && styles.activeTab]} onPress={() => toggleTab('list')}>
          <Text style={[activeTab === 'list' && styles.activeTabText]}>Liste</Text>
        </TouchableOpacity>
      </View>
      {activeTab === 'map' ? (
        <Text style={styles.scroll_view}>Map</Text>
      ) : (
        <ScrollView style={styles.scroll_view}>
          {hikes.map((hike, index) => {
            return <HikeComponent key={index} hike={hike} />;
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 0
  },
  tabHeader: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 10,
  },
  tab: {
    width: '50%',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    color: 'red'
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
  }
});



