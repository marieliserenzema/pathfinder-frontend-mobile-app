import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useUserContext } from '../../contexts/UserContext';
import HikeComponent from '../HikeComponent/HikeComponent';

export default function SavedScreen() {
  const { favoriteHikes } = useUserContext();

  return (
    <View style={styles.container} >
      {favoriteHikes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text>😌</Text>
          <Text>Vous n'avez pas de favoris pour l'instant</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          {favoriteHikes.map((hike, index) => (
            <HikeComponent key={index} hike={hike} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  }
});

