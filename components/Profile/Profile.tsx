import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Avatar, ListItem } from 'react-native-elements';
import { useUserContext } from '../../contexts/UserContext';
import { NavigationProp } from '@react-navigation/native';

interface ProfileScreenProps {
  navigation: NavigationProp<any>;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { user, logout } = useUserContext();

  const logoutnav = () => {
    logout();
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Profil</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Modifier</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Avatar rounded source={require('../../assets/avatar.png')} size="xlarge" containerStyle={styles.avatar} />
        <Text style={styles.name}>{user!.username}</Text>
      </View>
      <View style={styles.body}>
        <ListItem bottomDivider>
          <MaterialIcons name="email" size={24} color="#a3b18a" />
          <ListItem.Content>
            <ListItem.Title>{user!.email}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
          <MaterialIcons name="lock" size={24} color="#a3b18a" />
          <ListItem.Content>
            <ListItem.Title>************</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <TouchableOpacity onPress={logoutnav} style={styles.logoutButton}>
          <ListItem bottomDivider>
            <MaterialIcons name="logout" size={24} color="#a3b18a" />
            <ListItem.Content>
              <ListItem.Title>Se déconnecter</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    alignItems: 'center',
    marginTop: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  editButton: {
    position: 'absolute',
    right: 20,
  },
  editButtonText: {
    color: '#a3b18a',
    fontWeight: 'bold',
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    borderWidth: 5,
    borderColor: '#a3b18a',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  username: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  body: {
    marginTop: 50,
    padding: 20,
  },
  logoutButton: {
    marginTop: 20,
  },

});

export default ProfileScreen;


