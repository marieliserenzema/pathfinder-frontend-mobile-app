import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useUserContext } from '../../contexts/UserContext';
import client from '../../client/client';

const LoginScreen = () => {
  const { setToken } = useUserContext();
  const [userData, setUserData] = useState({
    _id : '',
    username: '',
    email: '',
    password: '',
    role: '',
    favorites: [],
  });

  const handleLogin = async () => {
    try {
      const response = await client.login(userData.email, userData.password);
      if(response.status === 200){
        console.log('Connexion réussie');
        setToken(response.token);

      } else {
        console.log('Connexion échouée');
      }
    } catch (error) {
      console.error(error);
    } 
  };

  const handleSignUp = () => {
    console.log('Création de compte');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connectez-vous</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setUserData({ ...userData, email: text })}
        value={userData.email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        onChangeText={(text) => setUserData({ ...userData, password: text })}
        value={userData.password}
        secureTextEntry
      />
      <Button title="Se connecter" onPress={handleLogin} />
      <Button title="Créer un compte" onPress={handleSignUp}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default LoginScreen;
