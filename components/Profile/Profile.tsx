import { MaterialIcons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput
} from "react-native";
import { Avatar, ListItem } from "react-native-elements";

import { useUserContext } from "../../contexts/UserContext";
import client from "../../client/client";

interface ProfileScreenProps {
  navigation: NavigationProp<any>;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { user, logout, token, setUserInfo } = useUserContext();
  const [edit, setEdit] = React.useState(false);


  const [newUserInfo, setNewUserInfo] = React.useState({
    username: user!.username,
    email: user!.email,
    password: user?.password,
  });

  const handleEdit = () => {
    setEdit(!edit);
  }

  const logoutnav = () => {
    logout();
    navigation.navigate("Login");
  };

  const handleSave = async () => {
    try {
      if (!token) return;
      var response;
      if (!newUserInfo.password) {
        response = await client.updateMeInfoWithoutPassword(token, newUserInfo.username, newUserInfo.email);
      } else {
        response = await client.updateMeInfoWithPassword(token, newUserInfo.username, newUserInfo.email, newUserInfo.password,);
      }
      if (response === true) {
        setEdit(false);
        setUserInfo(token);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Profil</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.editButtonText}>
            {edit ? 'Annuler' : 'Modifier'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Avatar rounded source={require('../../assets/avatar.png')} size="xlarge" containerStyle={styles.avatar} />
        {
          edit ?
            <TextInput
              style={styles.username}
              placeholder="Nouveau nom d'utilisateur"
              value={newUserInfo.username}
              onChangeText={(text) => setNewUserInfo({ ...newUserInfo, username: text })}
              autoCapitalize='none'
            />
            : <Text style={styles.username}>@{user!.username}</Text>
        }

      </View>
      <View style={styles.body}>
        <ListItem bottomDivider>
          <MaterialIcons name="email" size={24} color="#a3b18a" />
          <ListItem.Content>

            {
              edit ?
                <TextInput
                  style={styles.tileText}
                  placeholder="Nouvelle adresse email"
                  value={newUserInfo.email}
                  onChangeText={(text) => setNewUserInfo({ ...newUserInfo, email: text })}
                  autoCapitalize='none'
                />
                :

                <ListItem.Title>
                  <Text style={styles.tileText}>{user!.email}</Text>
                </ListItem.Title>
            }

          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
          <MaterialIcons name="lock" size={24} color="#a3b18a" />
          <ListItem.Content>
            {
              edit ?
                <TextInput
                  style={styles.tileTextEdit}
                  placeholder="Nouveau mot de passe"
                  value={newUserInfo.password}
                  onChangeText={(text) => setNewUserInfo({ ...newUserInfo, password: text })}
                  autoCapitalize='none'
                />
                :
                <ListItem.Title>
                  <Text style={styles.tileText}>************</Text>
                </ListItem.Title>
            }
          </ListItem.Content>
        </ListItem>
        {
          edit ?
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Enregistrer</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={logoutnav} style={styles.logoutButton}>
              <ListItem bottomDivider>
                <MaterialIcons name="logout" size={24} color="#a3b18a" />
                <ListItem.Content>
                  <ListItem.Title>Se déconnecter</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
        }


      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    alignItems: "center",
    marginTop: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  editButton: {
    position: "absolute",
    right: 20,
  },
  editButtonText: {
    color: "#a3b18a",
    fontWeight: "bold",
  },
  header: {
    alignItems: "center",
    marginTop: 20,
  },
  avatar: {
    borderWidth: 5,
    borderColor: "#a3b18a",
  },
  username: {
    marginTop: 5,
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  body: {
    marginTop: 50,
    padding: 20,
  },
  tileText: {
    fontSize: 14,
  },
  tileTextEdit: {
    fontSize: 14,
    borderBottomColor: 'gray',
  },
  logoutButton: {
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#a3b18a',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
  }

});

export default ProfileScreen;
